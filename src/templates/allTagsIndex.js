import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const AllTagsTemplate = ({pageContext}) => {
  const { tags, tagDescriptions } = pageContext
  return (
    <Layout>
      <div style={{
        margin: 'auto',
        minWidth: '575px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ul style={{
          listStyle: 'none'
        }}>
          {tags.map((tag, index) => {
            return (
              <li
                key={index}
              >
                <Link to={`tags/${tag}`}>{tag}</Link>
                <p>{tagDescriptions[tag]}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AllTagsTemplate