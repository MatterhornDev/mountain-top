import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

const activeLinkCheck = (pagePath, linkPath) => {
  return ( pagePath === "" && linkPath === "/" ) || ( pagePath === linkPath )
}

const LocationLink = ({ to, children, ...props }) => {
  return (
    <Location>
      {({ location }) => (
        <Link
          to={to}
          className={`nav-link ${activeLinkCheck(location.pathname, to) ? 'nav-active' : undefined}`}
          {...props}
        >
          {children}
        </Link>
      )}
    </Location>
  )
}

const Nav = () => {
  return (
    <div className='nav-container'>
      <ul className='nav-list'>
        <li className='nav-item'><LocationLink to="/">Home</LocationLink></li>
        <li className='nav-item'><LocationLink to="/tags">Tags</LocationLink></li>
        <li className='nav-item'><LocationLink to="/about">About</LocationLink></li>
      </ul>
    </div>
  )
}

export default Nav