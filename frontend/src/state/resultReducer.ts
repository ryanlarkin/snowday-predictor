/**
 * Action used to update prediction results
 */
export type ResultAction = {
  /**
   * The type of action accepted
   */
  type: "SET_RESULT"

  /**
   * The location for the prediction
   */
  location: {
    /**
     * The postal/zip code of the location
     */
    code: {
      /**
       * Whether it is a postal or zip code
       */
      type: "ZIP" | "POSTAL"

      /**
       * The value of the zip/postal code
       */
      codeValue: string
    }
  } | null

  /**
   * The chance of a snowday
   */
  chance: number | null

  /**
   * The date that the prediction is for
   */
  date: Date | null
}

/**
 * The state used by this reducer
 */
export type ResultState = {
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
   * The location for the prediction
   */
  location: {
    /**
     * The postal/zip code of the location
     */
    code: {
      /**
       * Whether it is a postal or zip code
       */
      type: "ZIP" | "POSTAL"

      /**
       * The value of the zip/postal code
       */
      codeValue: string
    }
  } | null

  /**
   * The chance of a snowday
   */
  chance: number | null

  /**
   * The date that the prediction is for
   */
  date: Date | null
}

/**
 * Reducer that takes a prediction result and saves it to the store
 */
export default (
  state: ResultState,
  { type, location, chance, date }: ResultAction
) =>
  type === "SET_RESULT"
    ? Object.assign({}, state, {
        loading: false,
        error: null,
        location: { ...location },
        chance,
        date,
      })
    : state
