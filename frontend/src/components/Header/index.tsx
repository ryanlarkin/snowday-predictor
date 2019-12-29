import { Helmet } from "react-helmet"
import React from "react"
import { connect } from "react-redux"
import { GlobalState } from "../../types/types"
import { TFunction } from "i18next"

/**
 * Type declaration for component props
 */
type ConnectedHeader = {
  /**
   * Translation function
   */
  t: TFunction

  /**
   * Data recieved from static query
   */
  queryData: {
    /**
     * Information about the latest local commit for this project
     */
    gitCommit: {
      /**
       * The hash of the commit
       */
      hash: string
    }
  }
}

const mapStateToProps = (props: GlobalState) => ({
  t: props.t,
})

/**
 * Sets header information including latest Git commit, and page title
 */
export default connect(mapStateToProps)(({ t, queryData }: ConnectedHeader) => (
  <Helmet
    defer={false}
    defaultTitle={t("title")}
    titleTemplate={`%s | ${t("title")}`}
    meta={[{ name: "commit", content: queryData.gitCommit.hash }]}
  />
))
