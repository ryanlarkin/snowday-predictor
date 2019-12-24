export type UserInputAction = {
  type: "SET_POSTALCODE"
  code: string
}

export type UserInputReducerState = {
  code: string | null
  loading: boolean
}

export default (
  state: UserInputReducerState = { code: null, loading: false },
  { code, type }: UserInputAction
) =>
  type === "SET_POSTALCODE"
    ? Object.assign({}, state, { code, loading: true })
    : state
