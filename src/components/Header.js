import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import logo from '../images/Logo.png'
import Nav from './Nav'

const Header = () => {
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
            minWidth: '575px',
            display: 'flex',
            flexDirection: 'row'
          }}>
            <img
              src={logo}
              alt="Matterhorn Logo"
              style={{
                width: 150,
                height: 150,
              }}
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#3F4C6A'
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