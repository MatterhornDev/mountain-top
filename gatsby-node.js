const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// const createTagPages = (createPage, posts) => {
//   const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
//   const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

//   const postsByTag = {}

//   posts.forEach(({node}) => {
//     if (node.frontmatter.tags) {
//       node.frontmatter.tags.forEach(tag => {
//         if (!postsByTag[tag]) {
//           postsByTag[tag] = []
//         }

//         postsByTag[tag].push(node)
//       })
//     }
//   })

//   const tags = Object.keys(postsByTag)

//   createPage({
//     path: '/tags',
//     component: allTagsIndexTemplate,
//     context: {
//       tags: tags.sort()
//     }
//   })

//   tags.forEach(tagName => {
//     const posts = postsByTag[tagName]

//     createPage({
//       path: `/tags/${tagName}`,
//       component: singleTagIndexTemplate,
//       context: {
//         posts,
//         tagName
//       }
//     })
//   })
// }

// exports.createPages = (({graphql, actions}) => {
//   const { createPage } = actions

//   const blogPostTemplate = path.resolve('src/templates/blogPost.js')

//   return graphql(`
//     query {
//       allMarkdownRemark (
//         sort: {order: ASC, fields: [frontmatter___date]}
//       ) {
//         edges {
//           node {
//             frontmatter {
//               path
//               tags
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     const posts = result.data.allMarkdownRemark.edges

//     createTagPages(createPage, posts)

//     posts.forEach(({node}, index) => {
//       const path = `posts${node.frontmatter.path}`
//       createPage({
//         path,
//         component: blogPostTemplate,
//         context: {
//           pathSlug: path,
//           prev: index === 0 ? null : posts[index - 1].node,
//           next: index === (posts.length - 1) ? null : posts[index + 1].node
//         }
//       })
//     })
//   })
// })

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
    }
  `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
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