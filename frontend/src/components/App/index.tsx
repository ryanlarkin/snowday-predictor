import React from "react"
import TitleBar from "../TitleBar"
import UserInput from "../UserInput"
import Loading from "../Loading"
import Results from "../Results"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorNotification from "../ErrorNotification"
import Footer from "../Footer"
import Image from "gatsby-image"

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

  .layer {
    background-color: #012a36;
    opacity: 0.3;
  }
`

const BgImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: -1;
  height: 100vh !important;

  & > img {
    object-fit: cover !important;
    object-position: 0% 0% !important;
    font-family: "object-fit: cover !important; object-position: 0% 0% !important;";
  }
`

type AppProps = {
  data: any
}

/**
 * Base component that renders all other components of the website
 */
export default ({ data }: AppProps) => (
  <AppStyles>
    <div className="layer">
      <BgImage fixed={data.file.childImageSharp.fixed} />
    </div>
    <TitleBar />
    <UserInput />
    <Loading />
    <Results />
    <ErrorNotification />
    <Footer />
  </AppStyles>
)
