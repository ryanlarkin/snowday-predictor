import { createStore as reduxCreateStore, combineReducers } from "redux"
import i18nReducer from "./i18nReducer"
import UserInputReducer from "./userInputReducer"

const reducer = combineReducers({ i18nReducer, UserInputReducer })

const createStore = () => reduxCreateStore(reducer)
export default createStore
