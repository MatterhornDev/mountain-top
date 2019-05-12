import React from 'react'
import Header from '../components/Header'
import Body from '../components/Body'

const Layout = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '15px'
    }}>
      <Header />
      <Body />
    </div>
  )
}

export default Layout
