const { gql } = require('apollo-server')

const userType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    username: String!
    password: String!
  }

  type Token {
    value: String!
  }
`

module.exports = {
  userType
}