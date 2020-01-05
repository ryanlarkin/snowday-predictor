import React from "react"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"
import styled from "styled-components"

const StyledRight = styled.div``

export default () => (
  <StyledRight className="right">
    <UserInput />
    <Loading />
    <Results />
  </StyledRight>
)
