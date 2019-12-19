import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import TitleBar from "../TitleBar"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"

const AppStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #012a36;
`

type ConnectedApp = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.i18nReducer.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedApp) => (
  <AppStyles>
    <TitleBar />
    <UserInput />
    <Loading />
    <Results />
  </AppStyles>
))
