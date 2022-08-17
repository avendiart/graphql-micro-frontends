import {
  validate,
  execute,
  GraphQLSchema,
  DocumentNode,
  subscribe,
} from 'graphql'
import { forAwaitEach, isAsyncIterable } from 'iterall'
import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

export namespace SchemaLink {
  export type ResolverContext = Record<string, any>
  export type ResolverContextFunction = (
    operation: Operation,
  ) => ResolverContext | PromiseLike<ResolverContext>

  export interface Options {
    /**
     * The schema to generate responses from.
     */
    schema: GraphQLSchema

    /**
     * The root value to use when generating responses.
     */
    rootValue?: any

    /**
     * A context to provide to resolvers declared within the schema.
     */
    context?: ResolverContext | ResolverContextFunction

    /**
     * Validate incoming queries against the given schema, returning
     * validation errors as a GraphQL server would.
     */
    validate?: boolean
  }
}

const isSubscription = (query: DocumentNode) => {
  const main = getMainDefinition(query)
  return (
    main.kind === 'OperationDefinition' && main.operation === 'subscription'
  )
}

export class SubscribingSchemaLink extends ApolloLink {
  public schema: SchemaLink.Options['schema']
  public rootValue: SchemaLink.Options['rootValue']
  public context: SchemaLink.Options['context']
  public validate: boolean

  constructor(options: SchemaLink.Options) {
    super()
    this.schema = options.schema
    this.rootValue = options.rootValue
    this.context = options.context
    this.validate = !!options.validate
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable<FetchResult>((observer) => {
      new Promise<SchemaLink.ResolverContext>((resolve) =>
        resolve(
          typeof this.context === 'function'
            ? this.context(operation)
            : this.context,
        ),
      )
        .then((context) => {
          if (this.validate) {
            const validationErrors = validate(this.schema, operation.query)
            if (validationErrors.length > 0) {
              return { errors: validationErrors }
            }
          }

          const executor = isSubscription(operation.query) ? subscribe : execute

          return executor({
            schema: this.schema,
            document: operation.query,
            rootValue: this.rootValue,
            contextValue: context,
            variableValues: operation.variables,
            operationName: operation.operationName,
          })
        })
        .then((data) => {
          if (isAsyncIterable(data)) {
            forAwaitEach(data, (value) => observer.next(value))
              .then(() => observer.complete())
              .catch((error) => observer.error(error))
            return
          }
          if (!observer.closed) {
            observer.next(data)
            observer.complete()
          }
        })
        .catch((error) => {
          if (!observer.closed) {
            observer.error(error)
          }
        })
    })
  }
}
