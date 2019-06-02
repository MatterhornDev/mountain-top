import React from 'react'
import Header from './Header'

const Layout = ({ headerProps, children }) => {
  return (
    <div className='layout'>
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
