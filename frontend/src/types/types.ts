import { TFunction } from "i18next"
import { i18nAction } from "src/state/i18nReducer"
import { WithTranslation } from "react-i18next"
import {
  UserInputReducerState,
  UserInputAction,
} from "src/state/userInputReducer"
import * as type from "io-ts"
import { ErrorState, ErrorAction } from "src/state/errorReducer"
import { ResultState, ResultAction } from "src/state/resultReducer"

/**
 * Required type literals for any action
 */
export type Action = Pick<ErrorAction, "type"> &
  Pick<i18nAction, "type"> &
  Pick<ResultAction, "type"> &
  Pick<UserInputAction, "type">

/**
 * State for entire store
 */
export type GlobalState = WithTranslation &
  UserInputReducerState &
  ErrorState &
  ResultState

/**
 * Type to hold translation information
 */
export type Translated = {
  /**
   * The translation function
   */
  t: TFunction
}

/**
 * Object type verification schema for GraphQL API responses
 */
export const ApiResponse = type.type({
  data: type.type({
    prediction: type.type({
      data: type.union([
        type.null,
        type.type({
          date: type.string,
          chance: type.number,
          location: type.type({
            code: type.type({
              codeValue: type.string,
              type: type.union([type.literal("POSTAL"), type.literal("ZIP")]),
            }),
          }),
        }),
      ]),
      error: type.union([
        type.null,
        type.type({
          id: type.string,
          values: type.array(type.string)
        }),
      ]),
    }),
  }),
})
