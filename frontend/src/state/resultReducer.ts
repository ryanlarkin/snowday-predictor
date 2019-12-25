export type ResultAction = {
  type: "SET_RESULT"
  location: {
    code: {
      type: "ZIP" | "POSTAL"
      codeValue: string
    }
  } | null
  chance: number | null
}

export type ResultState = {
  error: {
    errorKey: string
    errorValues: string[]
  } | null
  location: {
    code: {
      type: "ZIP" | "POSTAL"
      codeValue: string
    }
  }
  chance: number
  loading: boolean
}

export default (state: ResultState, { type, location, chance }: ResultAction) =>
  type === "SET_RESULT"
    ? Object.assign({}, state, {
        loading: false,
        error: null,
        location: { ...location },
        chance,
      })
    : state
