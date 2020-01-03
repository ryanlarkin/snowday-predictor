import { Helmet } from "react-helmet"
import React from "react"
import { connect } from "react-redux"
import { GlobalState } from "../../types/types"
import { TFunction, i18n } from "i18next"

/**
 * Type declaration for component props
 */
type ConnectedHeader = {
  /**
   * Translation function
   */
  t: TFunction

  /**
   * Language information
   */
  i18n: i18n

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
  i18n: props.i18n,
})

/**
 * Sets header information including latest Git commit, and page title
 */
export default connect(mapStateToProps)(
  ({ t, i18n, queryData }: ConnectedHeader) => (
    <Helmet
      defer={false}
      defaultTitle={t("title")}
      titleTemplate={`%s | ${t("title")}`}
      meta={[
        { name: "commit", content: queryData.gitCommit.hash },
        { name: "description", content: t("siteDescription") },
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { httpEquiv: "Content-Type", content: "text/html; charset=utf-8" },
      ]}
    >
      <link rel="canonical" href="https://www.snowdaypredictor.net" />
      <html lang={i18n.language.substring(0, 2)} />
    </Helmet>
  )
)
