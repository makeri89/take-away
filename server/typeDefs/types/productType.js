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

const orderProductType = gql`
  type OrderProduct {
    product: Product!
    amount: Int!
  }
`

module.exports = {
  productType,
  orderProductType
}