const { gql } = require('apollo-server')

const query = gql`
  type Query {
    allUsers: [User]!
    allProducts(
      priceLimit: Int
      category: String
    ): [Product]!
    allOrders(
      customer: String
    ): [Order]!
    me: User
  }
`

module.exports = {
  query
}