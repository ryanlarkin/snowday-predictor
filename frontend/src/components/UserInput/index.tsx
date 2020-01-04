import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Form, Button, Col, InputGroup } from "react-bootstrap"
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
  margin-left: 1rem;
  margin-right: 1rem;

  .input-label {
    font-size: 1.8rem;
    color: #ccdbdc !important;
  }

  .input-submit {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
    color: #000000 !important;
    font-size: 1.5rem !important;
    border-bottom-right-radius: 0.25rem !important;
    border-top-right-radius: 0.25rem !important;
    font-family: "Source Sans Pro" !important;
    font-weight: 600 !important;
    opacity: 1 !important;

    :hover {
      background-color: #60acb0 !important;
      border-color: #60acb0 !important;
    }
  }

  .form-row {
    justify-content: center;
  }

  .form-control {
    font-size: 1.5rem !important;
    font-family: "Source Sans Pro" !important;
    font-weight: 600 !important;
    background-color: #ffffffb3;
    opacity: 1;
    color: #000000ff !important;
    padding-right: calc(1.5em + 0.75rem);

    :focus {
      background-color: #ffffff;
    }
  }

  .invalid-feedback {
    font-size: 1.25rem;
    color: #ffae00;
  }

  button[disabled] {
    pointer-events: none;
    opacity: 0.8 !important;
  }

  .invalid-feedback {
    display: block;
    visibility: hidden;
  }

  .is-invalid ~ .invalid-feedback {
    visibility: visible;
    display: block;
  }

  .input-group-append,
  .form-control {
    box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  }

  .input-group {
    margin-left: 0px;
    margin-right: 0px;
  }

  margin-top: 30vh;
  margin-bottom: 7rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
    margin-bottom: 0rem;
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
            <Form.Group as={Col} controlId="postalCodeValidation">
              <Form.Label className="input-label">{t("inputLabel")}</Form.Label>
              <InputGroup className="row">
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
                <InputGroup.Append>
                  <Button
                    className="input-submit"
                    disabled={!isValid || !values.postalCode}
                    type="submit"
                  >
                    {t("submitButton")}
                  </Button>
                </InputGroup.Append>
                {/* Tell the user what they did wrong when the form has errors */}
                <Form.Control.Feedback type="invalid">
                  {t("inputInvalid")}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  </StyledUserInput>
))
