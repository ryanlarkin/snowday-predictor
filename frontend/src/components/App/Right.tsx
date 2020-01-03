import React from "react"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"
import styled from "styled-components"

const StyledRight = styled.div`
  .spacer {
    height: 20%;
  }
`

export default () => (
  <StyledRight className="right">
    <div className="spacer" />
    <UserInput />
    <Loading />
    <Results />
  </StyledRight>
)
