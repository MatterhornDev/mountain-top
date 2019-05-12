import React from 'react'
import { Link } from 'gatsby'
import Header from './../components/Header'
const AllTagsTemplate = ({pageContext}) => {
  const { tags } = pageContext
  return (
    <div>
      <Header />
      <div>
        <ul>
          {tags.map((tag, index) => {
            return (
              <li key={index}>
                <Link to={`tags/${tag}`}>{tag}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AllTagsTemplate