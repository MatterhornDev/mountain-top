import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Posts from '../components/Posts';

const SingleTagTemplate = ({data, pageContext}) => {
  const {tag, tagDescription} = pageContext

  return (
    <Layout>
      <div style={{
        gridArea: '2 / 2 / 3 / 3'
      }}>
        <div style={{
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
        <Posts />
      </div>
    </Layout>
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
          }
        }
      }
    }
  }
`

export default SingleTagTemplate