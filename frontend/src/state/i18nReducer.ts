import { WithTranslation } from "react-i18next"

export type i18nAction = {
  type: "SET_TRANSLATION"
} & WithTranslation

export default (state: WithTranslation | {}, { t, i18n, type }: i18nAction) =>
  type === "SET_TRANSLATION" ? Object.assign({}, state, { t, i18n }) : state
