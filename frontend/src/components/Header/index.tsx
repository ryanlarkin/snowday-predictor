import { Helmet } from "react-helmet"
import React from "react"
import { connect } from "react-redux"
import { GlobalState } from "../../types/types"
import { TFunction } from "i18next"

type ConnectedHeader = {
  t: TFunction
  data: {
    gitCommit: {
      hash: string
    }
  }
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

export default connect(mapStateToProps)(({ t, data }: ConnectedHeader) => (
  <Helmet
    defer={false}
    defaultTitle={t("title")}
    titleTemplate={`%s | ${t("title")}`}
    meta={[{ name: "commit", content: data.gitCommit.hash }]}
  />
))
