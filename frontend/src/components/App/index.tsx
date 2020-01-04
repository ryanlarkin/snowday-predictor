import React from "react"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorNotification from "../ErrorNotification"
import Image from "gatsby-image"
import Right from "./Right"
import Left from "./Left"

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

  .left,
  .right {
    float: left;
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
    }

    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .left:after {
    content: "";
    background-color: #000;
    position: absolute;
    top: 15vh;
    left: 50%;
    display: block;
    width: 0px;
    height: 70vh;

    @media (max-width: 768px) {
      width: 70vw;
      height: 0vh;
      top: 50%;
      left: 15vw;
    }

    border: 1px solid #ffffff;
  }

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
  user-select: none;

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
    <Left />
    <Right />
    <ErrorNotification />
  </AppStyles>
)
