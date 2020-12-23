const User = require('../models/User')
const Product = require('../models/Product')
const Order = require('../models/Order')
const { UserInputError } = require('apollo-server')

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
      return Order.find({})
    }
  },
  Mutation: {
    createNewUser: async (root, args) => {
      user = new User({ ...args })

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
      product = new Product({ ...args })

      try {
        await product.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return product
    }
  }
}

module.exports = {
  resolvers
}