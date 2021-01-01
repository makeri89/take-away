const { gql } = require('apollo-server')

const orderType = gql`
  type Order {
    id: ID!
    products: [OrderProduct]!
    totalProducts: Int
    totalUniqueProducts: Int
    subTotal: Int
    customer: User!
    date: String!
  }
`

module.exports = {
  orderType
}