import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import styles from './Nav.css'

const activeLinkCheck = (pagePath, linkPath) => {
  return ( pagePath === "" && linkPath === "/" ) || ( pagePath === linkPath ) ? 'active' : undefined
}

const LocationLink = ({ to, children, ...props }) => {
  return (
    <Location>
      {({ location }) => (
        <Link
          to={to}
          className={activeLinkCheck(location.pathname, to)}
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
    <div style={styles}>
      <ul>
        <li><LocationLink to="/">Home</LocationLink></li>
        <li><LocationLink to="/posts">Posts</LocationLink></li>
        <li><LocationLink to="/tags">Tags</LocationLink></li>
        <li><LocationLink to="/about">About</LocationLink></li>
      </ul>
    </div>
  )
}

export default Nav