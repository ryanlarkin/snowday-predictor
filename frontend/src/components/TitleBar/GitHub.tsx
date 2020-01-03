import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import { OutboundLink } from "../OutboundLink"

// Set sizing and colours, also set SVG CSS so it doesn't need to be changed later
const StyledButton = styled(OutboundLink)`
  margin: 2.5rem;
  font-size: 3rem !important;
  font-weight: 400;
  background-color: #012a3600 !important;
  border-color: #012a3600 !important;
  color: #ffffff !important;
  opacity: 0.5;

  svg:not(:root).svg-inline--fa {
    overflow: visible;
  }

  .svg-inline--fa.fa-w-16 {
    width: 1em;
  }

  .svg-inline--fa {
    display: inline-block;
    font-size: inherit;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }

  :hover {
    background-color: #0a324f !important;
    border-color: #0a324f !important;
  }
`

/**
 * Type declaration for component props
 */
type ConnectedGitHub = {
  /**
   * Translation function
   */
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

/**
 * Show the GitHub icon linking to the repository of this project
 */
export default connect(mapStateToProps)(({ t }: ConnectedGitHub) => (
  <StyledButton
    target="blank"
    href="https://github.com/eandr127/snowday-predictor"
  >
    <span>
      <FontAwesomeIcon icon={faGithub} /> {t("github")}
    </span>
  </StyledButton>
))
