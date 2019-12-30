// graphql.js
import * as tf from "@tensorflow/tfjs";

const { ApolloServer, gql } = require("apollo-server-lambda");
const { GraphQLDate } = require("graphql-iso-date");
const model = await tf.loadLayersModel("model.h5");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  scalar Date

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
    date: Date!
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
  Date: GraphQLDate,
  Query: {
    prediction(parent, args, context, info) {
      if (args.code.charAt(0) < "0" && args.code.charAt(0) > "9") {
        countryCode = "CA";
      } else {
        countryCode = "US";
      }

      if (countryCode === "CA") {
        apiURL =
          "http://api.openweathermap.org/data/2.5/forecast?zip=" +
          args.code +
          ",CA&appid=" +
          process.env.key;
      }
      // Code is from the US
      else
      {
        apiURL = 
        "http://api.openweathermap.org/data/2.5/forecast?zip=" +
        args.code +
        "&appid=" +
        process.env.key;
      }

      apiData = $.getJSON(apiURL);

      return {
        data: {
          chance: model.predict(),
          location: {
            code: {
              codeValue: args.code,
              type: "POSTAL"
            }
          },
          date: new Date()
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
