import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { navigate } from '@reach/router'

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
            gridArea: '2 / 2 / 3 / 3',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {edges.map(edge => {
              const {fields, frontmatter} = edge.node
              return (
                <React.Fragment>
                  <hr
                    key={`hr-${fields.slug}`}
                    style={{
                      width: '100%',
                      border: '1px solid rgb(244, 126, 191)'
                    }}
                  />
                  <div
                    key={fields.slug}
                    style={{
                      minWidth: '575px',
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '30px',
                      marginBottom: '30px',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      navigate(`${fields.slug}`)
                    }}
                  >
                    <GatsbyImage fixed={frontmatter.featuredImage.childImageSharp.fixed} />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '7px'
                    }}>
                      <h2 style={{
                        marginTop: '3px',
                        marginBottom: 0,
                        color: '#3F4C6A'
                      }}>{frontmatter.title}</h2>
                      <p>{frontmatter.excerpt}</p>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        )}}
    />
  )
}

export default Posts