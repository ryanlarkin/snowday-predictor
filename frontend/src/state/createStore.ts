import {
  createStore as reduxCreateStore,
  Middleware,
  MiddlewareAPI,
  Dispatch,
  AnyAction,
  applyMiddleware,
} from "redux"
import i18nReducer from "./i18nReducer"
import UserInputReducer from "./userInputReducer"
import reduceReducers from "reduce-reducers"
import ErrorReducer from "./errorReducer"
import ResultReducer from "./resultReducer"

/**
 * Sends dispatch after the current is complete
 * @param param0 The object containing the dispatch information
 */
const asyncDispatchMiddleware: Middleware<Dispatch> = ({
  dispatch,
}: MiddlewareAPI) => next => (action: AnyAction) => {
  let syncActivityFinished = false
  let actionQueue: AnyAction[] = []

  function flushQueue() {
    actionQueue.forEach(a => dispatch(a)) // flush queue
    actionQueue = []
  }

  function asyncDispatch(asyncAction: AnyAction) {
    actionQueue = actionQueue.concat([asyncAction])

    if (syncActivityFinished) {
      flushQueue()
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch })

  next(actionWithAsyncDispatch)
  syncActivityFinished = true
  flushQueue()
}

// Combines all reducers and sets the initial state
const reducer = reduceReducers(
  {
    code: null,
    loading: false,
    error: null,
    chance: null,
    location: null,
    date: null,
  },
  i18nReducer,
  UserInputReducer,
  ErrorReducer,
  ResultReducer
)

/**
 * Creates the store to use in React shared between all components
 */
const createStore = () =>
  reduxCreateStore(reducer, applyMiddleware(asyncDispatchMiddleware))
export default createStore
