import React from 'react'
import GatsbyImage from 'gatsby-image'
import { graphql } from 'gatsby'
import { navigate } from '@reach/router'
import Layout from '../components/Layout'

const SingleTagTemplate = ({data, pageContext}) => {
  const {tag, tagDescription} = pageContext

  return (
    <Layout>
      <div style={{
        minWidth: '575px',
        borderBottom: '2px solid #F47EBF',
        marginBottom: '20px'
      }}>
        <h2 style={{
          marginBottom: '5px',
          color: '#3F4C6A',
        }}>{tag}</h2>
        <p style={{
          marginTop: '2px',
          color: '#3F4C6A'
        }}>{tagDescription}</p>
      </div>
      <div style={{
        margin: 'auto',
        minWidth: '575px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {data.allMarkdownRemark.edges.map(({node: post}) => {
          return (
            <div
              key={post.fields.slug}
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
                navigate(`${post.fields.slug}`)
              }}
            >
              <GatsbyImage fixed={post.frontmatter.featuredImage.childImageSharp.fixed} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '3px'
              }}>
                <h2 style={{
                  marginTop: '3px',
                  marginBottom: 0,
                  color: '#3F4C6A'
                }}>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.excerpt}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark (
      filter: { frontmatter: { tags: { eq: $tag } } }
      sort: {order: DESC, fields: [frontmatter___date]}
    ) { 
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
`

export default SingleTagTemplate