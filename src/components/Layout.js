import React from 'react'
import Header from './Header'
import SEO from './SEO'

const Layout = ({ headerProps, children }) => {
  return (
    <div className='layout'>
      <SEO/>
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
