import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Alert } from "react-bootstrap"
import { ErrorAction } from "../../state/errorReducer"
import { Dispatch } from "redux"
import styled from "styled-components"

/**
 * Type declaration for component props
 */
type ConnectedErrorNotification = {
  /**
   * Translation function
   */
  t: TFunction
  /**
   * The translation information used to display the error, or null to hide the notification
   */
  error: {
    /**
     * Translation key for the error
     */
    errorKey: string

    /**
     * Variables to use for the translation, where the key for each value is its index
     */
    errorValues: string[]
  } | null

  /**
   * Dispatch event to close the error notification
   */
  closeError: () => void
}

// Make notification appear at bottom of screen
const StyledErrorNotification = styled.div`
  bottom: 0px;
  left: 0px;
  right: 0px;
  position: absolute;

  .alert {
    margin-bottom: 0px;
  }
`

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Remove error on invocation
  closeError: () => dispatch<ErrorAction>({ type: "SET_ERROR", error: null }),
})

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  error: props.error,
})

/**
 * Shows error notification at bottom of screen, that can be closed
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ t, error, closeError }: ConnectedErrorNotification) =>
  // Only show notification when there is an error to display
  !error ? (
    <></>
  ) : (
    <StyledErrorNotification>
      <Alert variant="danger" onClose={closeError} dismissible>
        <Alert.Heading>{t("errorHeading")}</Alert.Heading>
        <p>
          {t(error.errorKey, {
            // Values will have key set to their index
            ...error.errorValues,
          })}
        </p>
      </Alert>
    </StyledErrorNotification>
  )
)
