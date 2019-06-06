import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const AllTagsTemplate = ({pageContext}) => {
  const { tags, tagDescriptions } = pageContext
  return (
    <Layout seoProps={{ title: 'Tags' }}>
      <div className='tags-container'>
        <ul className='tags-list'>
          {tags.map((tag, index) => {
            return (
              <li key={index} className='tags-list-item'>
                <Link to={`tags/${tag}`}>{`${tag}`}</Link>
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