import React from 'react'
import Posts from '../components/Posts'
import Layout from '../components/Layout'

const App = () => {
  return (
    <Layout seoProps={{ title: 'Home' }}>
      <Posts />
    </Layout>
  )
}

export default App