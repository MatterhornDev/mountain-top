import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import './Body.css'
import { navigate } from '@reach/router';

const Body = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___date]}
          ){
            edges {
              node {
                frontmatter {
                  title
                  path
                  date
                  excerpt
                  featuredImage {
                    childImageSharp{
                      fixed(width: 125, height: 125) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { edges } = data.allMarkdownRemark
        return (
          <div className='bodyContainer'>
            {edges.map(edge => {
              const {frontmatter} = edge.node
              return (
                <div
                  key={frontmatter.path}
                  className='bodyPostCard'
                  onClick={() => {
                    navigate(frontmatter.path)
                  }}
                >
                  <Img fixed={frontmatter.featuredImage.childImageSharp.fixed} />
                  <div className='bodyPostCard-Content'>
                    <h2>{frontmatter.title}</h2>
                    <p>{frontmatter.excerpt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      }
    />
  )
}

export default Body