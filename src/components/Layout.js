import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'

const Layout = () => {
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
        }
      `}
      render={data => (
        <React.Fragment>
          <Header
            title={data.site.siteMetadata.title}
            description={data.site.siteMetadata.description}
          />
          <Body />
          <Footer />
        </React.Fragment>
      )}
    />
  )
}

export default Layout