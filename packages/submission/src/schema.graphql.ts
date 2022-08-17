import gql from 'graphql-tag'

export const typeDefs = gql`
  type Submission {
    id: String!
  }

  type User {
    id: String!
    submissions: [Submission!]!
  }

  type Mutation {
    createSubmission: Submission
  }

  type Query {
    submissions: [Submission!]!
  }

  type Subscription {
    submissionCreated: Submission
  }
`
