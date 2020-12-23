export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    username: String!
    password: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    url: String!
    price: Int!
  }

  type Order {
    id: ID!
    products: [Product]!
    customer: User!
  }
`