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
              <div className='header-break'/>
              <Nav />
            </div>
          </div>
        )
      }}
    />
  )
}

export default Header