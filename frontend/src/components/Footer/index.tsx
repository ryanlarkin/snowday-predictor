import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

type ConnectedFooter = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

const StyledFooter = styled.div`
  color: #ccdbdc;
  position: absolute;
  left: 0px;
  bottom: 0px;

  p {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`

export default connect(mapStateToProps)(({ t }: ConnectedFooter) => (
  <StyledFooter>
    <p>{t("authors")}</p>
  </StyledFooter>
))
