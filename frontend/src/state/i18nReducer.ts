import { WithTranslation } from "react-i18next"

export type i18nAction = {
  type: "SET_TRANSLATION"
} & WithTranslation

export default (state: WithTranslation | null, { t, i18n }: i18nAction) =>
  Object.assign({}, state, { t, i18n })
