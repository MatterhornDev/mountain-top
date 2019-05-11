import React from "react"
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDesc = ({ data }) => {
  const { title, description } = data.site.siteMetadata

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'avenir'
    }}>
      <h2 style={{marginBottom: 0}}>{title}</h2>
      <p style={{
        marginTop: 0,
        opacity: 0.5
      }}>
        {description}
      </p>
    </div>
  )
}

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
      render={data => <TitleAndDesc data={data}/>}
    />
  )
}

export default Header