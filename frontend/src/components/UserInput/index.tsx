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

const schema = object({
  postalCode: string()
    .matches(
      /(^\d{5}$)|(^\d{5}-\d{4}$)|(^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$)/
    )
    .required(),
})

type ConnectedUserInput = {
  t: TFunction
  setCode: (code: string) => UserInputAction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCode: (code: string) =>
    dispatch<UserInputAction>({ type: "SET_POSTALCODE", code }),
})

const StyledUserInput = styled.div`
  input[name="postalCode"] {
    flex-grow: 1;
  }

  .submitCol {
    flex-grow: 0;
  }

  .inputLabel {
    font-size: 1.2rem;
    color: #ccdbdc !important;
  }

  .inputSubmit {
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
`

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
              <Form.Label className="inputLabel">{t("inputLabel")}</Form.Label>
              <Form.Row>
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
                  <Form.Control.Feedback type="invalid">
                    {t("inputInvalid")}
                  </Form.Control.Feedback>
                </Col>
                <Col className="submitCol">
                  <Button
                    className="inputSubmit"
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
