import React from 'react'
import Header from '../components/Header'

function Posts() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '15px'
    }}>
      <Header />
      <h2>Posts Page</h2>
    </div>
  )
}

export default Posts