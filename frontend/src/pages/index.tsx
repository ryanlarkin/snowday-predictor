import React from "react"
import withI18next from "../components/withI18next"
import { Helmet } from "react-helmet"

export default withI18next({ ns: "common" })(({ t }) => (
  <>
    <Helmet
      defer={false}
      defaultTitle={t("title")}
      titleTemplate={`%s | ${t("title")}`}
    ></Helmet>
    <div>{t("greeting")}</div>
  </>
))
