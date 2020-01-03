import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import GitHub from "./GitHub"

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

  p {
    margin-bottom: 0rem;
    text-align: center;
  }
`

/**
 * Displays the label with author information in bottom left corner of screen
 */
export default connect(mapStateToProps)(({ t }: ConnectedFooter) => (
  <StyledFooter>
    <p>{t("authors")}</p>
    <GitHub />
  </StyledFooter>
))
