import { createStore as reduxCreateStore, combineReducers } from "redux"
import i18nReducer from "./i18nReducer"

const reducer = combineReducers({ i18nReducer })

const createStore = () => reduxCreateStore(reducer)
export default createStore
