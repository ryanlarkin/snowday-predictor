import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { Navbar, Nav } from "react-bootstrap"
import GitHub from "./GitHub"

const TitleStyles = styled(Navbar)`
  background: #012a36;

  .page-title {
    @import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");
    font-family: "Lobster", cursive;
    font-size: 3.5rem;
    color: #ccdbdc !important;
  }
`

type ConnectedTitleBar = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.i18nReducer.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedTitleBar) => (
  <TitleStyles>
    <Navbar.Brand className="page-title">{t("pageTitle")}</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <GitHub />
      </Nav>
    </Navbar.Collapse>
  </TitleStyles>
))
