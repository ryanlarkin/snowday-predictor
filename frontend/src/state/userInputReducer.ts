import { createApolloFetch } from "apollo-fetch"
import { ApiResponse } from "../types/types"
import { isRight } from "fp-ts/lib/Either"
import { AnyAction } from "redux"
import { ErrorType } from "./errorReducer"

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
})

export type UserInputAction = {
  type: "SET_POSTALCODE"
  code: string
}

type WithAsyncDispatch = UserInputAction & {
  asyncDispatch: (asyncAction: AnyAction) => void
}

export type UserInputReducerState = {
  code: string | null
  loading: boolean
}

export default (
  state: UserInputReducerState,
  { code, type, asyncDispatch }: WithAsyncDispatch
) => {
  if (type === "SET_POSTALCODE") {
    fetch({
      query: `query SnowdayPrediction($code: String!) {
        prediction(code: $code) {
            data {
                chance
                location{
                  code {
                    codeValue
                    type
                  }
                }
              }
              error{
                id
              }
        }
      }`,
      variables: { code },
    })
      .then(res => {
        const decoded = ApiResponse.decode(res)
        if (isRight(decoded)) {
          if (decoded.right.data.prediction.error) {
            const error = decoded.right.data.prediction.error
            console.error(error.id)
            asyncDispatch({
              type: "SET_ERROR",
              error: {
                errorKey: error.id,
              } as ErrorType,
            })
          } else if (!decoded.right.data.prediction.data) {
            console.error("Null data")
            asyncDispatch({
              type: "SET_ERROR",
              error: {
                errorKey: "nullData",
              } as ErrorType,
            })
          } else {
            const data = decoded.right.data.prediction.data
            console.log(data)
          }
        } else {
          console.error(decoded.left)
          asyncDispatch({
            type: "SET_ERROR",
            error: {
              errorKey: "malformedResponse",
            } as ErrorType,
          })
        }
      })
      .catch(err => {
        console.error(err)
        asyncDispatch({
          type: "SET_ERROR",
          error: {
            errorKey: "unknownError",
            errorValues: [err.name, err.message],
          } as ErrorType,
        })
      })

    return Object.assign({}, state, { code, loading: true })
  } else {
    return state
  }
}
