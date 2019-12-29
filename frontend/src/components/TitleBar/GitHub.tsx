import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"

const StyledButton = styled(Button)`
  margin: 2.5rem;
  font-size: 3rem !important;
  background-color: #012a36 !important;
  border-color: #012a36 !important;
  color: #ccdbdc !important;

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

type ConnectedGitHub = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

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
