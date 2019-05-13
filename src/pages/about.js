import React from 'react'
import Header from '../components/Header'

function About () {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '15px'
    }}>
      <Header />
      <h2>About Page</h2>
    </div>
  )
}

export default About