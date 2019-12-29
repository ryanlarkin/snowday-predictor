import { ApiResponse } from "../types/types"
import { isRight } from "fp-ts/lib/Either"
import { AnyAction } from "redux"
import { ErrorType } from "./errorReducer"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"
import "cross-fetch/polyfill"

// Endpoint for request
// TODO: Save as environment variable somehow
const httpLink = createHttpLink({
  uri:
    "https://a5lqw0a1u1.execute-api.us-east-2.amazonaws.com/default/snowday-predict",
})

// Client for sending requests
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

// Query to send for request
const query = gql`
  query SnowdayPrediction($code: String!) {
    prediction(code: $code) {
      data {
        chance
        date
        location {
          code {
            codeValue
            type
          }
        }
      }
      error {
        id
      }
    }
  }
`

/**
 * Action for setting postal/zip code
 */
export type UserInputAction = {
  /**
   * The type of action accepted
   */
  type: "SET_POSTALCODE"

  /**
   * The postal/zip code to check
   */
  code: string
}

/**
 * Internal type that also contains the async dispatch middleware
 */
type WithAsyncDispatch = UserInputAction & {
  asyncDispatch: (asyncAction: AnyAction) => void
}

/**
 * State used by this reducer
 */
export type UserInputReducerState = {
  /**
   * The zip/postal code or null if it is not set
   */
  code: string | null

  /**
   * Whether the loading bar should be shown
   */
  loading: boolean

  /**
   * The error notification displayed
   */
  error: {
    /**
     * The translation key used for the translation
     */
    errorKey: string

    /**
     * Error information used for the translation
     */
    errorValues: string[]
  } | null

  /**
   * The chance of a snowday, or null if it is not known
   */
  chance: number | null
}

/**
 * Reducer that receives postal code and sends a request to the backend API after the dispatch is complete
 */
export default (
  state: UserInputReducerState,
  { code, type, asyncDispatch }: WithAsyncDispatch
) => {
  if (type === "SET_POSTALCODE") {
    client
      .query({
        query,
        variables: { code },
      })
      .then(res => {
        // Use io-ts to check if types are correct
        const decoded = ApiResponse.decode(res)

        // Check if the object could be decoded
        if (isRight(decoded)) {
          // Check for API errors
          if (decoded.right.data.prediction.error) {
            const error = decoded.right.data.prediction.error

            // Log error, and update the notification
            console.error(error.id)
            asyncDispatch({
              type: "SET_ERROR",
              error: {
                errorKey: error.id,
              } as ErrorType,
            })
          }
          // There was no error and no data returned (this should never happen)
          else if (!decoded.right.data.prediction.data) {
            // Log and update error notification
            console.error("Null data")
            asyncDispatch({
              type: "SET_ERROR",
              error: {
                errorKey: "nullData",
              } as ErrorType,
            })
          } else {
            const data = decoded.right.data.prediction.data

            const date = new Date(data.date)

            // Check if date is valid
            if (isNaN(date.getDate())) {
              // Log and update notification error
              console.error("Invalid date", date)
              asyncDispatch({
                type: "SET_ERROR",
                error: {
                  errorKey: "malformedResponse",
                } as ErrorType,
              })
            }
            // Data is valid
            else {
              // Dispatch an even to save the result of the request
              asyncDispatch({
                type: "SET_RESULT",
                ...data,
                date,
              })
            }
          }
        }
        // Data did not match the type provided
        else {
          // Log and update error notification
          console.error(decoded.left)
          asyncDispatch({
            type: "SET_ERROR",
            error: {
              errorKey: "malformedResponse",
            } as ErrorType,
          })
        }
      })
      // Error in request
      .catch(err => {
        // Log and update error notification
        console.error(err)
        asyncDispatch({
          type: "SET_ERROR",
          error: {
            errorKey: "unknownError",
            errorValues: [err.name, err.message],
          } as ErrorType,
        })
      })

    // Set state so that the loading bar appears, and previous results are removed
    return Object.assign({}, state, {
      code,
      error: null,
      loading: true,
      chance: null,
      location: null,
      date: null,
    })
  } else {
    return state
  }
}
