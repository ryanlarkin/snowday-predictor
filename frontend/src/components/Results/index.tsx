import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Badge } from "react-bootstrap"
import styled from "styled-components"

/**
 * Type declaration for component props
 */
type ConnectedResults = {
  /**
   * Translation function
   */
  t: TFunction

  /**
   * The location that the query was for, or null if there are no results
   */
  location: {
    /**
     * The postal or zip code of the location
     */
    code: {
      /**
       * Whether this is a postal code or zip code
       */
      type: "ZIP" | "POSTAL"

      /**
       * The value of the postal/zip code
       */
      codeValue: string
    }
  } | null

  /**
   * The prediction result for the location, or null if there is no result
   */
  chance: number | null

  /**
   * The date that the prediction is for, or null if there is not result
   */
  date: Date | null
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  chance: props.chance,
  location: props.location,
  date: props.date,
})

// Centre component, and set colours/sizing
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

/**
 * Shows the chance of a snowday, and the day that the prediction is for.
 * Hides the prediction if there was no query response
 */
export default connect(mapStateToProps)(
  ({ t, chance, date }: ConnectedResults) =>
    !(chance && date) ? (
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
