const { gql } = require('apollo-server')

const mutation = gql`
  type Mutation {
    createNewProduct(
      name: String!,
      description: String!,
      url: String!,
      price: Int!
      category: String
    ): Product
    createNewOrder(
      customer: String!
      products: [String]! # TODO custom scalar type here
      date: String!
    ): Order
    createNewUser(
      name: String!
      username: String!
      email: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    changePassword(
      id: ID!
      password: String!
    ): User
    updateUserPhone(
      id: ID!
      phone: String!
    ): User
  }
`

module.exports = {
  mutation
}
