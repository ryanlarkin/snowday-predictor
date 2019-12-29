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
  date: Date
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  chance: props.chance,
  location: props.location,
  date: props.date,
})

const StyledResults = styled.div`
  display: flex;
  justify-content: center;

  p {
    text-align: center;
    color: #ccdbdc;
    font-size: 3rem;
    margin-bottom: 0px;
  }

  .badge {
    background-color: #ccdbdc;
    color: #012a36;
    font-size: 6rem;
    display: flex;
    justify-content: center;
  }
`

export default connect(mapStateToProps)(
  ({ t, chance, date }: ConnectedResults) =>
    !chance ? (
      <></>
    ) : (
      <StyledResults>
        <div>
          <p>
            {t("dateFormat", {
              date: date.getDate(),
              weekday: t("day", { context: date.getDay().toString() }),
              month: t("month", { context: date.getMonth().toString() }),
            })}
          </p>
          <Badge variant="primary">
            {t("result", {
              chance: Math.round(chance * 100),
            })}
          </Badge>
        </div>
      </StyledResults>
    )
)
