const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct')
const { UserInputError, AuthenticationError } = require('apollo-server')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    allUsers: (root, args) => {
      return User.find({})
    },
    allProducts: async (root, args) => {
      if (args.priceLimit) {
        const products = await Product.find({
          price: { $lte: args.priceLimit }
        })
        return products
      }

      if (args.category) {
        const products = await Product.find({
          category: args.category
        })
        return products
      }

      if (args.priceLimit && args.category) {
        const products = await Product.find({
          price: { $lte: args.priceLimit },
          category: args.category
        })
        return products
      }
      
      return Product.find({})
    },
    allOrders: async (root, args) => {
      if (args.customer) {
        const customer = await User.findOne({ username: args.customer })
        const orders = await Order.find({
          customer: { $in: customer._id }
        }).populate('products').populate('customer')
        console.log(orders)
        return orders
      }
      return Order.find({}).populate('products').populate('customer')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    singleProduct: (root, args) => {
      return Product.findOne({ name: args.name })
    }
  },
  Mutation: {
    createNewUser: async (root, args) => {

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({ 
        name: args.name,
        username: args.username,
        email: args.email,
        password: passwordHash
       })

      try {
        await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return user
    },
    createNewProduct: async (root, args) => {
      const product = new Product({ ...args })

      try {
        await product.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return product
    },
    createNewOrder: async (root, args, context) => {
      const customer = context.currentUser
      if (!customer) {
        throw new AuthenticationError('Please sign in before ordering')
      }
      console.log('new order', args.customer)

      const splitProducts = args.products.map(product => product.split(';'))
      let productsInDict = {}
      splitProducts.map(p => productsInDict[p[0]] = p[1])

      const products = await Product.find({
        name: { $in: Object.keys(productsInDict) }
      })

      let orderProducts = [];

      products.map(product => {
        const prod = new OrderProduct({
          name: product.name,
          description: product.description,
          url: product.url,
          price: product.price,
          amount: productsInDict[product.name]
        })
        try {
          prod.save()
          orderProducts.push(prod)
          console.log(orderProducts)
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      })

      console.log(orderProducts)

      const prices = orderProducts.map(product => product.price * product.amount)
      const reducer = (acc, curr) => acc + curr
      const totalSum = prices.reduce(reducer)

      let totalAmount = 0
      orderProducts.map(p => totalAmount += p.amount)

      let date = moment().format('YYYY-MM-DD')

      const order = new Order({
        customer: customer._id,
        products: orderProducts.map(p => p.id),
        date: date,
        subTotal: totalSum,
        totalUniqueProducts: orderProducts.length,
        totalProducts: totalAmount
      })

      try {
        await order.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return order
        .populate('customer')
        .populate('products')
        .execPopulate()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)
      
      if (!(user && passwordCorrect)) {
        throw new UserInputError('Invalid username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.JWT_SECRET)

      return { value: token }
    }
  }
}

module.exports = {
  resolvers
}