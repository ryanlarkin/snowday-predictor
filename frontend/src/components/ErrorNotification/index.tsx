import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Alert } from "react-bootstrap"
import { ErrorAction } from "../../state/errorReducer"
import { Dispatch } from "redux"
import styled from "styled-components"

type ConnectedErrorNotification = {
  t: TFunction
  error: {
    errorKey: string
    errorValues: string[]
  } | null
  closeError: () => void
}

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
  closeError: () => dispatch<ErrorAction>({ type: "SET_ERROR", error: null }),
})

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
  error: props.error,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ t, error, closeError }: ConnectedErrorNotification) =>
  !error ? (
    <></>
  ) : (
    <StyledErrorNotification>
      <Alert variant="danger" onClose={closeError} dismissible>
        <Alert.Heading>{t("errorHeading")}</Alert.Heading>
        <p>
          {t(error.errorKey, {
            ...error.errorValues,
          })}
        </p>
      </Alert>
    </StyledErrorNotification>
  )
)
