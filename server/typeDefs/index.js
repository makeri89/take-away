const { orderType, productType, userType } = require('./types')
const { query } = require('./query')
const { mutation } = require('./mutation')

const typeDefs = [
  orderType,
  productType,
  userType,
  query,
  mutation
]

module.exports = {
  typeDefs
}