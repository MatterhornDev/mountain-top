/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Mountain Top',
    titleTemplate: 'Mountain Top - %s',
    description: 'A blog for the TypeScript developer ecosystem',
    tags: {
      'typescript': 'A lot of things are tagged this. Learn more about Matterhorn\'s favorite topic', 
      'linting': 'Its not all about formatting! Linting can help you write better code too.',
      'eslint': 'The official TypeScript linter.', 
      'prettier': 'This one is all about making formatting effortless as possible.',
      'standard': 'Enough arguing over semicolons or not. Let Standard decide for you.',
      'entrepreneurship': 'What is your favorite episode of Silicon Valley?',
      'innovation': 'Creating new things that are solving real problems.',
      'pitching': 'Have you ever been on Shark Tank before? Neither have we.',
      'git': 'The Matterhorn team\'s favorite version control software.'
    },
    url: 'https://blog.matterhorn.dev',
    twitterUsername: "@MatterhornDev",
    image: "/images/icon.png"
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-141281398-1`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              quality: 100
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mountain Top`,
        short_name: `Mountain Top`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#3F4C6A`,
        display: `standalone`,
        icon: `src/images/icon.png`
      },
    },
  ]
}
