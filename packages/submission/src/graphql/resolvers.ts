import { PubSub } from 'graphql-subscriptions'
import { v4 } from 'uuid'
import { Resolvers, Submission } from './module'

export const resolvers = (pubsub: PubSub): Resolvers => {
  let submissions: Submission[] = []

  return {
    Subscription: {
      submissionCreated: {
        resolve: (payload: Submission) => payload,
        subscribe: () => pubsub.asyncIterator('submission-created') as any,
      },
    },
    Mutation: {
      createSubmission: () => {
        const submission = {
          id: v4(),
        }
        submissions.push(submission)
        pubsub.publish('submission-created', submission)
        return submission
      },
    },
    Query: {
      submissions: () => {
        return submissions
      },
    },
    User: {
      submissions: (parent) => {
        return submissions
      },
    },
  }
}
