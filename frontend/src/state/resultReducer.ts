export type ResultAction = {
  type: "SET_RESULT"
  location: {
    code: {
      type: "ZIP" | "POSTAL"
      codeValue: string
    }
  } | null
  chance: number | null
  date: Date
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
  date: Date
}

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
