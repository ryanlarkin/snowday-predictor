import i18n from "i18next"

/**
 * Default locale if non is set
 */
export const defaultLocale = "en"

/**
 * Namespace to find translations
 */
export const defaultNamespace = "common"

/**
 * Options for i18next
 */
export const options = {
  fallbackLng: defaultLocale,
  ns: [defaultNamespace],
  defaultNS: defaultNamespace,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    wait: false,
  },

  initImmediate: false, // Important for SSR to work
}

/**
 * Initialized i18n object
 */
export default () => {
  i18n.init(options)

  return i18n
}
