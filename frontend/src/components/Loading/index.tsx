import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import Loader from "./Loader"
import styled from "styled-components"

type ConnectedLoading = {
  t: TFunction
  loading: boolean
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  loading: props.loading,
})

const StyledLoading = styled.div`
  .hide {
    visibility: hidden;
  }
`

export default connect(mapStateToProps)(({ t, loading }: ConnectedLoading) => (
  <StyledLoading>
    <div className={loading ? "unhide" : "hide"}>
      <Loader />
    </div>
  </StyledLoading>
))
