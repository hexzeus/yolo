import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `My Gatsby Printful Store`,
    description: `An e-commerce store using Gatsby and Printful`,
    author: `@yourusername`, // Ensure this field is correctly defined
    siteUrl: `https://yoursiteurlhere.com`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`, // Corrected plugin name
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-printful-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `orbitron\:400,700`, // Orbitron font
        ],
        display: 'swap',
      },
    },
    `gatsby-plugin-postcss`, // Add this line for Tailwind CSS
  ],
}

export default config;
