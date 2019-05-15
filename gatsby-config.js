/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Mountain Top',
    description: 'The official blog for the Matterhorn developer ecosystem',
    tags: {
      "abc": "An example description for abc tag. Its the first tag!",
      "def": "Another tag description. Let me tell you everything about it.",
      "donuts": "Deliciousness in every bite.",
      "fake": "I don't exist",
      "kittens": "So cute; be careful of their claws!",
      "puppies": "Everyone's best friend. Don't mess with them, they have a big bark."
    }
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              quality: 100
            }
          }
        ]
      }
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
    }
  ]
}
