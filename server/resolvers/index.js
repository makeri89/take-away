const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const { UserInputError } = require('apollo-server')
const moment = require('moment')

const resolvers = {
  Query: {
    allUsers: (root, args) => {
      return User.find({})
    },
    allProducts: (root, args) => {
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
      const user = new User({ ...args })

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
    createNewOrder: async (root, args) => {
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
    }
  }
}

module.exports = {
  resolvers
}