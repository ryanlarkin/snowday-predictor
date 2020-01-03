import React from "react"
import TitleBar from "../TitleBar"
import Footer from "../Footer"
import styled from "styled-components"

const StyledLeft = styled.div`
  .spacer {
    height: 40%;
  }
`

export default () => (
  <StyledLeft className="left">
    <div className="spacer" />
    <TitleBar />
    <Footer />
  </StyledLeft>
)
