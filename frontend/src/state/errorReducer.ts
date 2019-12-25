export type ErrorAction = {
  type: "SET_ERROR"
  error: ErrorType
}

export type ErrorType = { errorKey: string; errorValues?: string[] } | null

export type ErrorState = {
  error: {
    errorKey: string
    errorValues: string[]
  } | null
  loading: boolean
}

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

export default (state: ErrorState, { type, error }: ErrorAction) =>
  type === "SET_ERROR"
    ? Object.assign({}, state, { loading: false, error: checkArray(error) })
    : state
