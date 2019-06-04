import React from 'react'
import Header from './Header'
import SEO from './SEO'

const Layout = ({ seoProps, headerProps, children }) => {
  return (
    <div className='layout'>
      <SEO {...seoProps} />
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
