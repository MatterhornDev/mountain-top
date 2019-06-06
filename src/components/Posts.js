import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
// import GatsbyImage from 'gatsby-image'

export const _Posts = ({data}) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div className='posts'>
      {edges.map(edge => {
        const {fields, frontmatter} = edge.node
        return (
          <React.Fragment>
            <hr key={`hr-${fields.slug}`} />
            <div
              className='post-container'
              key={fields.slug}
            >
              {/* Disabled for now; also disabled in styles. 
                <GatsbyImage fixed={frontmatter.featuredImage.childImageSharp.fixed} /> */}
              <div className='post-content'>
                <Link to={fields.slug}>
                  <h2>{frontmatter.title}</h2>
                </Link>
                <p>{frontmatter.excerpt}</p>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

/*
This is the old featuredImage query. Currently disabled
frontmatter {
  featuredImage {
    childImageSharp{
      fixed(width: 125, height: 125) {
        ...GatsbyImageSharpFixed
      }
    }
  }
}
*/
const Posts = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___date]}
          ){
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
                  excerpt
                }
              }
            }
          }
        }
      `}
      render={data => <_Posts data={data}/>}
    />
  )
}

export default Posts