require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
  .then(() => {
  console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connectiong to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})