const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const createTagPages = (createPage, tags, tagDescriptions) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
      tagDescriptions
    }
  })

  tags.forEach(tagName => {
    createPage({
      path: `/tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        tag: tagName,
        tagDescription: tagDescriptions[tagName]
      }
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      site {
        siteMetadata {
          tags {
            typescript, linting, eslint, prettier, standard
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        throw result.errors
      }
      const posts = result.data.allMarkdownRemark.edges
      const tags = Object.keys(result.data.site.siteMetadata.tags)
      const tagDescriptions = result.data.site.siteMetadata.tags

      createTagPages(createPage, tags, tagDescriptions)

      posts.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blogPost.js`),
          context: {
            slug: node.fields.slug
          }
        })
      })
    })
}