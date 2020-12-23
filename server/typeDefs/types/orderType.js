const { gql } = require('apollo-server')

const orderType = gql`
  type Order {
    id: ID!
    products: [Product]!
    customer: User!
    date: String!
  }
`

module.exports = {
  orderType
}