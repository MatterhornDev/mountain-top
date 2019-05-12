import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
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
          <div style={{
            margin: 'auto',
            minWidth: '575px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {edges.map(edge => {
              const {frontmatter} = edge.node
              return (
                <div
                  key={frontmatter.path}
                  style={{
                    minWidth: '575px',
                    display: 'flex',
                    flexDirection: 'row',
                    border: '2px solid #F47EBF',
                    marginTop: '5px',
                    marginBottom: '5px',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    navigate(frontmatter.path)
                  }}
                >
                  <Img fixed={frontmatter.featuredImage.childImageSharp.fixed} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '3px'
                  }}>
                    <h2 style={{
                      marginTop: '3px',
                      marginBottom: 0,
                      color: '#3F4C6A'
                    }}>{frontmatter.title}</h2>
                    <p>{frontmatter.excerpt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}}
    />
  )
}

export default Body