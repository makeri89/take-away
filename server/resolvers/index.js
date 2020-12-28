const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
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
        const customer = User.find({ username: args.customer })
        const orders = await Order.find({
          customer: { $in: customer.id }
        })
        return orders
      }
      return Order.find({}).populate('products').populate('customer')
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
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Please sign in before ordering')
      }
      const customer = await User.findOne({ username: args.customer })

      const products = await Product.find({
        name: { $in: args.products }
      })

      let date = moment().format('YYYY-MM-DD')

      const order = new Order({
        customer: customer._id,
        products: products.map(p => p.id),
        date: date,
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