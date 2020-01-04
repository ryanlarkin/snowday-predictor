import { TFunction, TFunctionResult } from "i18next"

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
const StyledResults = styled.span`
  display: flex;
  justify-content: center;

  p {
    width: 50%;
    text-align: center;
    color: #ccdbdc;
    font-size: 2.4rem;
    margin-bottom: 0px;
    line-height: 92.7%;
  }

  .badge {
    background-color: #ffffff;
    opacity: 0.7;
    color: #012a36;
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  }
`

/**
 * Gets the number to display for percent edge cases which round to 0 or 100 but do not equal those values
 *
 * @param chance The unrounded percentage chance of a snowday from 0 to 100 (inclusive)
 * @param t The translation function
 * @returns Either the percentage rounded to no decimal places or special negligible
 *            or certain values when the result is between (0, 0.5) or [99.5, 100)
 */
const getPercent = (chance: number, t: TFunction): TFunctionResult | number => {
  if (chance > 0 && chance < 0.5) {
    return t("negligible")
  } else if (chance >= 99.5 && chance < 100) {
    return t("almostCertain")
  } else {
    return Math.round(chance)
  }
}

/**
 * Shows the chance of a snowday, and the day that the prediction is for.
 * Hides the prediction if there was no query response
 */
export default connect(mapStateToProps)(
  ({ t, chance, date }: ConnectedResults) =>
    !(chance !== null && date) ? (
      <></>
    ) : (
      <StyledResults>
        <p>
          {t("dateFormat", {
            date: date.getUTCDate(),
            weekday: t("day", { context: date.getUTCDay().toString() }),
            month: t("month", { context: date.getUTCMonth().toString() }),
          })}
        </p>
        <Badge variant="primary">
          {t("result", {
            chance: getPercent(chance * 100, t),
          })}
        </Badge>
      </StyledResults>
    )
)
