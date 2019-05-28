import React from 'react'
import { graphql } from 'gatsby'
import Header from './../components/Header'

const Template = ({ data }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '15px'
    }}>
      <Header />
      <div
        style={{
          maxWidth: '700px',
          marginLeft: '10px',
          marginRight: '10px'
        }}
        dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}
      />
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template