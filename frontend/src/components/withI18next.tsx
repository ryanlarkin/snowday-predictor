import React, { Component, ElementType } from "react"
import { I18nProvider } from "gatsby-i18n"
import { I18nextProvider, Translation, WithTranslation } from "react-i18next"
import setupI18next from "../i18n"
import { i18n as realI18n } from "i18next"

const lngFormat = (locale: string) =>
  locale.replace(/-[a-z]{2}$/, (e: string) => e.toUpperCase())

type Withi18nextProps = {
  pageContext: { locale: string }
}

const withI18next = (options = {}) => (
  Comp: ElementType<WithTranslation & { locale: string }>
) => {
  class I18nHOC extends Component<Withi18nextProps, any> {
    private i18n: realI18n
    constructor(props: any) {
      super(props)

      const { pageContext, data } = props
      this.state = {
        ns: "",
        ...options,
        data: pageContext.data,
        queryData: data,
      }

      this.i18n = setupI18next()
      this.activateLng()
    }

    activateLng = () => {
      const { pageContext } = this.props
      const { data } = this.state
      this.parseFromContext(data)
      this.i18n.changeLanguage(lngFormat(pageContext.locale))
    }

    parseFromContext = (data: any) => {
      const { pageContext } = this.props
      if (data) {
        const lng = lngFormat(pageContext.locale)
        data.forEach(({ ns = "common", content }: any) => {
          if (!this.i18n.hasResourceBundle(lng, ns)) {
            this.i18n.addResourceBundle(lng, ns, JSON.parse(content))
          }
        })
      }
    }

    componentDidUpdate(prevProps: Withi18nextProps) {
      if (this.props.pageContext.locale !== prevProps.pageContext.locale) {
        this.activateLng()
      }
    }

    render() {
      return (
        <I18nextProvider i18n={this.i18n}>
          <I18nProvider {...this.props.pageContext}>
            <Translation>
              {t => (
                <Comp
                  t={t}
                  i18n={this.i18n}
                  tReady={true}
                  locale={this.props.pageContext.locale}
                />
              )}
            </Translation>
          </I18nProvider>
        </I18nextProvider>
      )
    }
  }

  return I18nHOC
}

export default withI18next
