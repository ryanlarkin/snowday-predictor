import React from "react"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorNotification from "../ErrorNotification"
import Image from "gatsby-image"
import Right from "./Right"
import Left from "./Left"

const ContainerStyles = styled.div``

// Apply background colour to entire screen
const AppStyles = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #012a36;
  font-family: "Source Sans Pro";
  font-weight: 600;
  overflow: auto;
  height: 100%;
  background-color: #012a36b3;

  .left,
  .right {
    float: left;
    @media (max-width: 768px) {
      width: 100%;
      height: auto;
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
    top: 15%;
    left: 50%;
    display: block;
    width: 0px;
    height: 70%;

    @media (max-width: 768px) {
      width: 70%;
      height: 0px;
      position: relative;
      left: 0%;
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    border: 1px solid #ffffff;
  }
`

const BgImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: -1;
  height: 100% !important;
  user-select: none;

  min-height: 100%;

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
  <ContainerStyles>
    <BgImage fixed={data.file.childImageSharp.fixed} />
    <AppStyles>
      <Left />
      <Right />
      <ErrorNotification />
    </AppStyles>
  </ContainerStyles>
)
