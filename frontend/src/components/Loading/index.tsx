import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import Loader from "./Loader"
import styled from "styled-components"

/**
 * Type declaration for component props
 */
type ConnectedLoading = {
  /**
   * Whether or not the loader should display
   */
  loading: boolean
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  loading: props.loading,
})

// Animate hiding and unhiding of loader
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

/**
 * Shows an animated loader when loading, hides the component when not loading
 */
export default connect(mapStateToProps)(({ loading }: ConnectedLoading) => (
  <StyledLoading>
    <div className={loading ? "unhide" : "hide"}>
      <Loader />
    </div>
  </StyledLoading>
))
