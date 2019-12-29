import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Form, Button, Col } from "react-bootstrap"
import { Formik } from "formik"
import { string, object } from "yup"
import styled from "styled-components"
import { UserInputAction } from "src/state/userInputReducer"
import { Dispatch } from "redux"

/**
 * Required input format for zip/postal code
 */
const schema = object({
  postalCode: string()
    .matches(
      /(^\d{5}$)|(^\d{5}-\d{4}$)|(^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$)/
    )
    .required(),
})

/**
 * Type declaration for component props
 */
type ConnectedUserInput = {
  /**
   * Translation function
   */
  t: TFunction

  /**
   * Dispatch to save the postal/zip code and send prediction query
   */
  setCode: (code: string) => UserInputAction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Sets postal/zip code and starts invocation of query to backend
  setCode: (code: string) =>
    dispatch<UserInputAction>({ type: "SET_POSTALCODE", code }),
})

// Sizing and colours, make text input expand rather than submit button
const StyledUserInput = styled.div`
  input[name="postalCode"] {
    flex-grow: 1;
  }

  .submit-col {
    flex-grow: 0;
  }

  .input-label {
    font-size: 2.4rem;
    color: #ccdbdc !important;
  }

  .input-submit {
    background-color: #56a3a6 !important;
    border-color: #56a3a6 !important;
    color: #ccdbdc !important;

    :hover {
      background-color: #60acb0 !important;
      border-color: #60acb0 !important;
    }
  }

  .form-row {
    justify-content: center;
  }

  .form-control {
    font-size: 2rem !important;
  }

  .input-submit {
    font-size: 2rem !important;
  }

  .invalid-feedback {
    font-size: 1.25rem;
  }

  .disabled {
    cursor: pointer;
  }
`

/**
 * Component for receiving postal/zip code from user. Sends query on submit
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ t, setCode }: ConnectedUserInput) => (
  <StyledUserInput>
    <Formik
      validationSchema={schema}
      onSubmit={({ postalCode }) => {
        setCode(postalCode)
      }}
      initialValues={{
        postalCode: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        setTouched,
        errors,
      }) => (
        <Form className="form" noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="5" controlId="postalCodeValidation">
              <Form.Label className="input-label">{t("inputLabel")}</Form.Label>
              <Form.Row className="input-row">
                <Col>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    placeholder={t("inputPlaceholder")}
                    value={values.postalCode}
                    onChange={handleChange}
                    isValid={touched.postalCode && !errors.postalCode}
                    isInvalid={touched.postalCode && !!errors.postalCode}
                    onBlur={handleBlur}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      // Give feedback when user presses enter
                      if (e.key === "Enter") {
                        setTouched({ postalCode: true })
                      }
                    }}
                  />
                  {/* Tell the user what they did wrong when the form has errors */}
                  <Form.Control.Feedback type="invalid">
                    {t("inputInvalid")}
                  </Form.Control.Feedback>
                </Col>
                <Col className="submit-col">
                  <Button
                    className="input-submit"
                    disabled={!isValid || !values.postalCode}
                    type="submit"
                  >
                    {t("submitButton")}
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  </StyledUserInput>
))
