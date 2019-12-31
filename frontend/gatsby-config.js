/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-source-local-git",
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: ["600"],
          },
          {
            family: `Lobster`,
            variants: [`400`],
          },
        ],
      },
    },
  ],
}
