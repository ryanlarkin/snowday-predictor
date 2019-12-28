// graphql.js

const { ApolloServer, gql } = require('apollo-server-lambda');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum CodeType {
    POSTAL
    ZIP
  }

  type Code {
    codeValue: String!
    type: CodeType!
  }

  type PredictionResult {
    error: Error
    data: PredictionResultData
  }

  type PredictionResultData {
    chance: Float!
    location: Location!
  }

  type Location {
    code: Code!
  }

  type Error {
    id: ID!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    prediction(code: String!): PredictionResult
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    prediction(parent, args, context, info) {
      return {
        data: {
          chance: 0.99,
          location: {
            code: {
              codeValue: args.code,
              type: "POSTAL"
            }
          }
        }
      };
    }
  }
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  introspection: true,
  playground: true
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});