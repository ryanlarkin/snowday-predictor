import { TFunction } from "i18next"
import { i18nAction } from "src/state/i18nReducer"
import { WithTranslation } from "react-i18next"

export type Action = Pick<i18nAction, "type"> // And any other possible reducer types

export type GlobalState = { i18nReducer: WithTranslation }

export type Translated = {
  t: TFunction
}
