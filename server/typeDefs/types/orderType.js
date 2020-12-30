const { gql } = require('apollo-server')

const orderType = gql`
  type Order {
    id: ID!
    products: [OrderProduct]!
    customer: User!
    date: String!
  }
`

module.exports = {
  orderType
}