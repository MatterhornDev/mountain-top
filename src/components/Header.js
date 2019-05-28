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
          <div style={{
            margin: 'auto',
            marginBottom: '20px',
            minWidth: '575px',
            display: 'flex',
            flexDirection: 'row',
            height: '150px'
          }}>
            {showLogo && <img src={Logo} alt='Matterhorn Logo' width={135} height={150}/>}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#3F4C6A',
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
              <hr style={{
                width: '100%',
                border: '2px solid #3F4C6A'
              }}/>
              <Nav />
            </div>
          </div>
        )
      }}
    />
  )
}

export default Header