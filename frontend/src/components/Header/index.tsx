import { Helmet } from "react-helmet"
import React from "react"
import { connect } from "react-redux"
import { GlobalState } from "../../types/types"
import { TFunction } from "i18next"

type ConnectedHeader = {
  t: TFunction
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.i18nReducer.t,
})

export default connect(mapStateToProps)(({ t }: ConnectedHeader) => (
  <Helmet
    defer={false}
    defaultTitle={t("title")}
    titleTemplate={`%s | ${t("title")}`}
  />
))
