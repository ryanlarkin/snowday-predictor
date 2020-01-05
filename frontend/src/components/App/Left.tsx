import React from "react"
import TitleBar from "../TitleBar"
import Footer from "../Footer"
import styled from "styled-components"

const StyledLeft = styled.div``

export default () => (
  <StyledLeft className="left">
    <TitleBar />
    <Footer />
  </StyledLeft>
)
