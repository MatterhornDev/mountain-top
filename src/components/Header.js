import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Nav from './Nav'
import GatsbyImage from 'gatsby-image';

const Header = ({ showLogo = true }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
          file (
            relativePath:{eq: "Logo.png"}
          ) {
            childImageSharp {
              fixed(width: 135, height:150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => {
        const { title, description } = data.site.siteMetadata
        return (
          <div style={{
            margin: 'auto',
            marginBottom: '20px',
            minWidth: '575px',
            display: 'flex',
            flexDirection: 'row',
            height: '150px'
          }}>
            {showLogo && <GatsbyImage fixed={data.file.childImageSharp.fixed} />}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#3F4C6A',
              borderBottom: '3px solid #3F4C6A',
              marginLeft: '15px'
            }}>
              <h1 style={{marginBottom: 0}}>{title}</h1>
              <p style={{
                marginTop: 0,
                marginBottom: '2px',
                opacity: 0.7
              }}>
                {description}
              </p>
              <Nav />
            </div>
          </div>
        )
      }}
    />
  )
}

export default Header