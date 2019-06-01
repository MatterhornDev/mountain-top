import React from 'react'
import Header from './Header'

const Layout = ({ headerProps, children }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60% 1fr',
      gridTemplateRows: '150px 1fr',
      gridColumnGap: '0px',
      gridRowGap: '20px',
      marginTop: '20px',
      marginBottom: '20px'
    }}>
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
