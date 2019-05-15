import React from 'react'
import Header from './Header'

const Layout = ({ headerProps, children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '15px'
    }}>
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
