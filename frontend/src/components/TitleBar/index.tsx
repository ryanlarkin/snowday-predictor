import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

// Set sizing and fonts for navbar
const TitleStyles = styled.span`
  background: #012a3600;
  padding-bottom: 10rem !important;
  font-family: "Lobster", cursive;
  font-weight: 400;
  font-size: 3.5rem;
  color: #ffffff !important;
  opacity: 0.8;
`
/**
 * Type declaration for component props
 */
type ConnectedTitleBar = {
  /**
   * Translation function
   */
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

/**
 * Component for navbar at top of screen, with title and GitHub link
 */
export default connect(mapStateToProps)(({ t }: ConnectedTitleBar) => (
  <TitleStyles>{t("pageTitle")}</TitleStyles>
))
