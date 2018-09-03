module.exports = {
  siteMetadata: {
    title: 'Albion Fame Calculato',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Albion Fame Calculato',
        short_name: 'calculato',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-offline',
  ],
}
