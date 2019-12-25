import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"

type ConnectedResults = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedResults) => (
  <>
    <p>Results</p>
  </>
))
