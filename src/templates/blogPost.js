import React from 'react'
import { graphql, Link } from 'gatsby'
import Header from './../components/Header'

const Template = ({ data , pageContext }) => {
  const { next, prev } = pageContext
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '15px'
    }}>
      <Header showLogo={false}/>
      <h2>{title}</h2>
      <div
        className='blogpost'
        dangerouslySetInnerHTML={{__html: html}}
      />

      { next && <Link to={next.frontmatter.path}>Next</Link> }
      { prev && <Link to={prev.frontmatter.path}>Previous</Link> }
    </div>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template