import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const AllTagsTemplate = ({pageContext}) => {
  const { tags, tagDescriptions } = pageContext
  return (
    <Layout>
      <div style={{
        gridArea: '2 / 2 / 3 / 3',
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
                style={{
                  marginBottom: '20px'
                }}
              >
                <Link
                  to={`tags/${tag}`}
                  style={{
                    fontSize: '1.5rem',
                    color: '#3F4C6A',
                    textDecoration: 'none',
                  }}
                >{`${tag}`}</Link>
                <p style={{
                  marginTop: '2px',
                  marginLeft: '10px',
                  marginBottom: 0,
                  color: '#F47EBF'
                }}>{tagDescriptions[tag]}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AllTagsTemplate