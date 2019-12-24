import { TFunction } from "i18next"

import { GlobalState } from "../../types/types"

import React from "react"
import { connect } from "react-redux"
import { Form, Button, Col } from "react-bootstrap"
import { Formik } from "formik"
import { string, object } from "yup"

const schema = object({
  postalCode: string()
    .matches(
      /(^\d{5}$)|(^\d{5}-\d{4}$)|(^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$)/
    )
    .required(),
})

type ConnectedUserInput = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.i18nReducer.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedUserInput) => (
  <Formik
    validationSchema={schema}
    onSubmit={console.log}
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
      errors,
    }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="postalCodeValidation">
            <Form.Label>{t("inputLabel")}</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              placeholder={t("inputPlaceholder")}
              value={values.postalCode}
              onChange={handleChange}
              isValid={values.postalCode && !errors.postalCode}
              isInvalid={touched.postalCode && !!errors.postalCode}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {t("inputInvalid")}
            </Form.Control.Feedback>
          </Form.Group>
          <Button disabled={!isValid || !touched} type="submit">
            {t("submitButton")}
          </Button>
        </Form.Row>
      </Form>
    )}
  </Formik>
))
