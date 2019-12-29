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
  .unhide {
    transition: visibility 0.2s linear, opacity 0.2s linear;
    visibility: visible;
    opacity: 1;
  }

  .hide {
    transition: visibility 0.2s linear, opacity 0.2s linear;
    visibility: hidden;
    opacity: 0;
  }
`

export default connect(mapStateToProps)(({ t, loading }: ConnectedLoading) => (
  <StyledLoading>
    <div className={loading ? "unhide" : "hide"}>
      <Loader />
    </div>
  </StyledLoading>
))
