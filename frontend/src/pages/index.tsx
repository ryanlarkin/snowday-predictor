import React from "react"
import withI18next from "../components/withI18next"

export default withI18next({ ns: "common" })(({ t }) => (
  <div>{t("greeting")}</div>
))
