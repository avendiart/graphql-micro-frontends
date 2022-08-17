import { ApolloClient, InMemoryCache } from '@apollo/client'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { resolvers as authResolvers, typeDefs as authTypeDefs } from 'auth'
import { print } from 'graphql'
import {
  resolvers as submissionsResolvers,
  typeDefs as submissionsTypeDefs,
} from 'submission'
import { pubsub } from '../pubsub'
import { SubscribingSchemaLink } from './client/link'

const schema = mergeSchemas({
  schemas: [
    makeExecutableSchema({
      typeDefs: submissionsTypeDefs,
      resolvers: submissionsResolvers(pubsub),
    }),
    makeExecutableSchema({
      typeDefs: authTypeDefs,
      resolvers: authResolvers(pubsub),
    }),
  ],
})

const typeDefs = print(mergeTypeDefs([authTypeDefs, submissionsTypeDefs]))

console.log(typeDefs)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SubscribingSchemaLink({
    schema,
  }),
})
