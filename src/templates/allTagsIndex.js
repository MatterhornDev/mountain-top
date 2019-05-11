import React from 'react'
import { graphql, Link } from 'gatsby'

const AllTagsTemplate = ({data, pageContext}) => {
  const { tags } = pageContext
  return (
    <div>
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