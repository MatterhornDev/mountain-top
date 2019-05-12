import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import './Nav.css'

const activeLinkCheck = (pagePath, linkPath) => {
  return ( pagePath === "" && linkPath === "/" ) || ( pagePath === linkPath ) ? 'active' : undefined
}

const LocationLink = ({ to, children, ...props }) => {
  return (
    <Location>
      {({ location }) => (
        <Link
          to={to}
          className={`nav-link ${activeLinkCheck(location.pathname, to)}`}
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
    <div>
      <ul className='nav'>
        <li className='nav-item'><LocationLink to="/">Home</LocationLink></li>
        <li className='nav-item'><LocationLink to="/posts">Posts</LocationLink></li>
        <li className='nav-item'><LocationLink to="/tags">Tags</LocationLink></li>
        <li className='nav-item'><LocationLink to="/about">About</LocationLink></li>
      </ul>
    </div>
  )
}

export default Nav