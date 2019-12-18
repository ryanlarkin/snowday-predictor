import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import TitleBar from "../TitleBar"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"

type ConnectedApp = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.i18nReducer.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedApp) => (
  <>
    <h1>{t("greeting")}</h1>
    <TitleBar />
    <UserInput />
    <Loading />
    <Results />
  </>
))
