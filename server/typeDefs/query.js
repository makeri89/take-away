const { gql } = require('apollo-server')

const query = gql`
  type Query {
    allUsers: [User]!
    allProducts: [Product]!
    allOrders(customer: String): [Order]!
  }
`

module.exports = {
  query
}