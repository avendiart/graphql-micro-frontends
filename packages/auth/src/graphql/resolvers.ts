import { v4 } from 'uuid'
import { Resolvers, User } from './module'
import { PubSub } from 'graphql-subscriptions'

export const resolvers = (pubsub: PubSub): Resolvers => {
  const users: Array<User & { password: string }> = []
  let loggedInUser: User | null = null

  return {
    Subscription: {
      userLoggedIn: {
        resolve: (payload: User) => payload,
        subscribe: () => pubsub.asyncIterator('user-logged-in') as any,
      },
    },
    Query: {
      user: () => {
        return loggedInUser
      },
    },
    Mutation: {
      signupUser: (_, { input }) => {
        const user = users.find((user) => user.email === input.email)
        if (user) {
          throw new Error('User already signed up!')
        }
        const newUser = {
          id: v4(),
          email: input.email,
          password: input.password,
        }
        users.push(newUser)
        return newUser
      },
      loginUser: async (_, { input }) => {
        const user =
          users.find(
            (user) =>
              user.email === input.email && user.password === input.password,
          ) ?? null

        if (user) {
          loggedInUser = user
        }
        pubsub.publish('user-logged-in', loggedInUser)
        return user
      },
    },
  }
}
