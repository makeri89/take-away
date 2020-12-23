const { gql } = require('apollo-server')

const productType = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    url: String!
    price: Int!
  }
`

module.exports = {
  productType
}