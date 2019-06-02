import React from 'react'
import Header from './Header'
import { Helmet } from "react-helmet"

const Layout = ({ headerProps, children }) => {
  return (
    <div className='layout'>
      <Helmet>
        <title>Mountain Top</title>
      </Helmet>
      <Header {...headerProps} />
      {children}
    </div>
  )
}

export default Layout
