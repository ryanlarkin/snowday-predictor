import { WithTranslation } from "react-i18next"

/**
 * Action used to update language data/functions
 */
export type i18nAction = {
  /**
   * The type of action accepted
   */
  type: "SET_TRANSLATION"
} & WithTranslation

/**
 * Reducer that takes a translation and makes it available from the Redux store
 */
export default (state: WithTranslation | {}, { t, i18n, type }: i18nAction) =>
  type === "SET_TRANSLATION" ? Object.assign({}, state, { t, i18n }) : state
