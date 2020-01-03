import React from "react"
import Loader from "react-loader-spinner"
import styled from "styled-components"

// Centre loading component, and set size of component
const StyledLoader = styled(Loader)`
  display: flex;
  justify-content: center;

  svg {
    width: 5rem;
    height: 5rem;
  }
`

/**
 * Displays loading bars
 */
export default () => <StyledLoader type="Bars" color="#C4C4C4" />
