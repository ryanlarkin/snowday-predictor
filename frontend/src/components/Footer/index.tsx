import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

/**
 * Type declaration for component props
 */
type ConnectedFooter = {
  /**
   * Translation function
   */
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

// Move to bottom left corner of screen, with a small margin
const StyledFooter = styled.div`
  color: #ccdbdc;
  opacity: 0.5;
  position: absolute;
  left: 0px;
  bottom: 0px;

  p {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`

/**
 * Displays the label with author information in bottom left corner of screen
 */
export default connect(mapStateToProps)(({ t }: ConnectedFooter) => (
  <StyledFooter>
    <p>{t("authors")}</p>
  </StyledFooter>
))
