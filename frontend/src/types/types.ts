import { TFunction } from "i18next"
import { i18nAction } from "src/state/i18nReducer"
import { WithTranslation } from "react-i18next"
import { UserInputReducerState } from "src/state/userInputReducer"
import * as type from "io-ts"
import { ErrorState } from "src/state/errorReducer"
import { ResultState } from "src/state/resultReducer"

export type Action = Pick<i18nAction, "type"> // And any other possible reducer types

export type GlobalState = WithTranslation &
  UserInputReducerState &
  ErrorState &
  ResultState

export type Translated = {
  t: TFunction
}

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
        }),
      ]),
    }),
  }),
})
