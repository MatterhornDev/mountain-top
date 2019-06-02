import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Nav from './Nav'
import Logo from './../images/Logo.png'

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
        }
      `}
      render={data => {
        const { title, description } = data.site.siteMetadata
        return (
          <div className='header'>
            {showLogo && <img src={Logo} alt='Matterhorn Logo' className='logo'/>}
            <div className='header-content'>
              <h1>{title}</h1>
              <p>
                {description}
              </p>
              <hr />
              <Nav />
            </div>
          </div>
        )
      }}
    />
  )
}

export default Header