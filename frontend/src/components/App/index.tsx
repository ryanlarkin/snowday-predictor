import React from "react"
import TitleBar from "../TitleBar"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorNotification from "../ErrorNotification"
import Footer from "../Footer"

// Apply background colour to entire screen
const AppStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #012a36;
  font-family: "Source Sans Pro";
  font-weight: 600;
`

/**
 * Base component that renders all other components of the website
 */
export default () => (
  <AppStyles>
    <TitleBar />
    <UserInput />
    <Loading />
    <Results />
    <ErrorNotification />
    <Footer />
  </AppStyles>
)
