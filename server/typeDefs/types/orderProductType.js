const { gql } = require('apollo-server')

const orderProductType = gql`
  type OrderProduct {
    id: ID!
    name: String!
    description: String!
    url: String!
    price: Int!
    category: String
    amount: Int!
  }
`

module.exports = {
  orderProductType
}