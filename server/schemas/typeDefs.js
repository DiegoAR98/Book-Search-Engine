const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define a type for the User object containing fields from your acceptance criteria
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Define a type for the Book object containing fields from the Google Books API
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  # Define a type for the Auth object containing user data and a token
  type Auth {
    token: ID!
    user: User
  }

  # Define input for adding a new book since it requires several fields
  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  # Define the queries allowed for this schema
  type Query {
    me: User
  }

  # Define the mutations allowed for this schema
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
