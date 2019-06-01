import React from 'react'
import { graphql } from 'gatsby'
import Layout from './../components/Layout'

const Template = ({ data }) => {
  return (
    <Layout>
      <div
        style={{
          gridArea: '2 / 2 / 3 / 3',
        }}
        dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}
      />
    </Layout>
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