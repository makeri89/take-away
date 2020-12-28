const { gql } = require('apollo-server')

const productType = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    url: String!
    price: Int!
    category: String
  }
`

module.exports = {
  productType
}