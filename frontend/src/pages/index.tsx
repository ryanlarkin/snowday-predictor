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

library.add(faGithub)

const mapStateToProps = () => ({})

type ConnectedProps = {
  setLang: (t: TFunction, i18n: i18n, tReady: boolean) => i18nAction
} & WithTranslation

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLang: (t: TFunction, i18n: i18n, tReady: boolean) =>
    dispatch<i18nAction>({ type: "SET_TRANSLATION", t, i18n, tReady }),
})

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
