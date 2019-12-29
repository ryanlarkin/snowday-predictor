import React from "react"
import withI18next from "../components/withI18next"
import Header from "../components/Header"
import { Dispatch } from "redux"
import { TFunction, i18n } from "i18next"
import { i18nAction } from "../state/i18nReducer"
import { connect } from "react-redux"
import { WithTranslation } from "react-i18next"
import App from "../components/App"
import { StaticQuery, graphql } from "gatsby"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

// Preload GitHub icon
library.add(faGithub)

// Don't map anything, but required since there is a custom dispatcher
const mapStateToProps = () => ({})

/**
 * Component prop types
 */
type ConnectedProps = {
  /**
   * Sets the translation data/functions for all components to use
   */
  setLang: (t: TFunction, i18n: i18n, tReady: boolean) => i18nAction
} & WithTranslation

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Sets the required translation data
  setLang: (t: TFunction, i18n: i18n, tReady: boolean) =>
    dispatch<i18nAction>({ type: "SET_TRANSLATION", t, i18n, tReady }),
})

/**
 * Base page that renders the app and sets header information
 */
export default withI18next({ ns: "common" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ setLang, t, tReady, i18n }: ConnectedProps) => {
    setLang(t, i18n, tReady)

    return (
      <>
        <StaticQuery
          query={graphql`
            {
              gitCommit(latest: { eq: true }) {
                hash
              }
            }
          `}
          render={data => <Header queryData={data} />}
        />
        <App />
      </>
    )
  })
)
