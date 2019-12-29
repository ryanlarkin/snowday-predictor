import { Helmet } from "react-helmet"
import React from "react"
import { connect } from "react-redux"
import { GlobalState } from "../../types/types"
import { TFunction } from "i18next"

type ConnectedHeader = {
  t: TFunction
  queryData: {
    gitCommit: {
      hash: string
    }
  }
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

export default connect(mapStateToProps)(({ t, queryData }: ConnectedHeader) => (
  <Helmet
    defer={false}
    defaultTitle={t("title")}
    titleTemplate={`%s | ${t("title")}`}
    meta={[{ name: "commit", content: queryData.gitCommit.hash }]}
  />
))
