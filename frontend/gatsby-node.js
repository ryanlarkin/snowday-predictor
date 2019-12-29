const fs = require("fs")

// Load translations from filesystem
const localesNSContent = {
  en: [
    {
      content: fs.readFileSync(`src/locales/en/common.json`, "utf8"),
      ns: "common",
    },
  ],
  fr: [
    {
      content: fs.readFileSync(`src/locales/fr/common.json`, "utf8"),
      ns: "common",
    },
  ],
}

// Locales that may be used on the side
const availableLocales = [
  // TODO: Finish french translations are re-enable
  //  { value: "fr", text: "Français" },
  { value: "en", text: "English" },
]

// default locales don't end up in a specific locale route i.e example.com for english and example.com/fr for franch
const defaultLocales = { value: "en", text: "English" }

// Make page for each language
exports.onCreatePage = async props => {
  const {
    page,
    actions: { createPage, deletePage, createRedirect },
  } = props

  if (/^\/dev-404-page\/?$/.test(page.path)) {
    return
  }

  // Delete original page
  deletePage(page)

  // Recreate translated page for the given language
  availableLocales.map(({ value }) => {
    let newPath = `/${value}${page.path}`
    if (defaultLocales.value === value) {
      // Create page with no language path for default language
      const localePage = {
        ...page,
        originalPath: page.path,
        path: newPath,
        context: {
          availableLocales,
          locale: value,
          routed: true,
          data: localesNSContent[value],
          originalPath: page.path,
        },
      }
      createPage(localePage)
      newPath = page.path
    }

    // Create page with language path in URL
    const localePage = {
      ...page,
      originalPath: page.path,
      path: newPath,
      context: {
        availableLocales,
        locale: value,
        routed: true,
        data: localesNSContent[value],
        originalPath: page.path,
      },
    }
    createPage(localePage)
  })
}
