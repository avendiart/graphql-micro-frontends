import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input SignupUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    loginUser(input: LoginUserInput!): User
    signupUser(input: SignupUserInput!): User
  }

  type Query {
    user: User
  }

  type Subscription {
    userLoggedIn: User!
  }
`
