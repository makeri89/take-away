const { orderType, orderProductType, productType, userType } = require('./types')
const { query } = require('./query')
const { mutation } = require('./mutation')

const typeDefs = [
  orderType,
  orderProductType,
  productType,
  userType,
  query,
  mutation
]

module.exports = {
  typeDefs
}