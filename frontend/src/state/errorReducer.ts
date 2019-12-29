/**
 * Action that updates the error information
 */
export type ErrorAction = {
  /**
   * The type of action accepted
   */
  type: "SET_ERROR"

  /**
   * The error to display
   */
  error: ErrorType
}

/**
 * Information necessary to display the error, or null if there is no error
 */
export type ErrorType = { errorKey: string; errorValues?: string[] } | null

/**
 * The state used by this reducer
 */
export type ErrorState = {
  /** Information about the error, or null if there is no error */
  error: {
    /**
     * The key to be used by translations to display the error
     */
    errorKey: string

    /**
     * All further parameters to be passed to translations
     */
    errorValues: string[]
  } | null

  /**
   * Whether or not the loading bar should display
   */
  loading: boolean
}

/**
 * Converts optional error values to an empty array when there is none
 * @param error The error object to check/modify
 */
const checkArray = (
  error: ErrorType
): {
  errorKey: string
  errorValues: string[]
} | null =>
  error
    ? !error.errorValues
      ? { errorKey: error.errorKey, errorValues: [] }
      : { errorKey: error.errorKey, errorValues: error.errorValues }
    : null

/**
 * Handle changes to the error, so that a notification can be displayed
 */
export default (state: ErrorState, { type, error }: ErrorAction) =>
  type === "SET_ERROR"
    ? Object.assign({}, state, { loading: false, error: checkArray(error) })
    : state
