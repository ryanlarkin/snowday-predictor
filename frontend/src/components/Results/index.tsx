import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Badge } from "react-bootstrap"
import styled from "styled-components"

type ConnectedResults = {
  t: TFunction
  location: {
    code: {
      type: "ZIP" | "POSTAL"
      codeValue: string
    }
  } | null
  chance: number | null
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  chance: props.chance,
  location: props.location,
})

const StyledResults = styled.div`
  display: flex;
  justify-content: center;

  .badge {
    background-color: #ccdbdc;
    color: #012a36;
    font-size: 3rem;
  }
`

export default connect(mapStateToProps)(({ t, chance }: ConnectedResults) =>
  !chance ? (
    <></>
  ) : (
    <StyledResults>
      <Badge variant="primary">
        {t("result", {
          chance: Math.round(chance * 100),
        })}
      </Badge>
    </StyledResults>
  )
)
