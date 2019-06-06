import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
// import GatsbyImage from 'gatsby-image'
import { navigate } from '@reach/router'
import VisuallyHidden from "@reach/visually-hidden"

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
              onClick={() => {
                navigate(`${fields.slug}`)
              }}
            >
              {/* Disabled for now; also disabled in styles. 
                <GatsbyImage fixed={frontmatter.featuredImage.childImageSharp.fixed} /> */}
              <div className='post-content'>
                <h2>{frontmatter.title}</h2>
                <p>{frontmatter.excerpt}</p>
                <VisuallyHidden>
                  <Link to={`${fields.slug}`}/>
                </VisuallyHidden>
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