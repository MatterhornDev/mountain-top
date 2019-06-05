import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout seoProps={{ title: 'About' }}>
      <div style={{
        gridArea: '2 / 2 / 3 / 3',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{
          color: '#3F4C6A'
        }}>About Page</h2>
        <div style={{
          color: '#3F4C6A',
          opacity: 0.9
        }}>
          <p>Matterhorn is an ecosystem of TypeScript development tools and resources to help developers of all experience levels get up and running faster.</p>
          <p>We strive to eliminate the barrier of entry for new TypeScript developers, and make the lives of experienced developers easier.</p>
          <p>
            This site was created by <a href="https://github.com/Ethan-Arrowood">Ethan Arrowood</a> and is 100% open-sourced.
            Find the public repository <a href="https://github.com/MatterhornDev/Mountain-Top">here</a>.
            It is built on <a href="https://www.gatsbyjs.org/">Gatsby</a> and is maintained by the incredible Matterhorn Open Source Community.
          </p>
          <p>The Matterhorn team currently consists of multiple students from <a href="https://wit.edu/">Wentworth Institute of Technology</a>.</p>
          <p>They are:</p>
          <ul>
            <li><a href="https://github.com/Alyssa-Cooper">Alyssa Cooper</a> - <i>Core Developer</i></li>
            <li><a href="https://www.linkedin.com/in/s-seltenreich">Sophia Seltenreich</a> - <i>Business Management</i></li>
            <li><a href="https://www.linkedin.com/in/kathesh-handy-36a74814b">Kathesh Handy</a> - <i>Design and Branding</i></li>
          </ul>
          <p>Contact us at <a href="mailto:contact@matterhorn.dev">contact@matterhorn.dev</a> and find us on Twitter at <a href="https://twitter.com/MatterhornDev">@MatterhornDev</a></p>
          <br />
          <small>Last Updated on June 1st, 2019</small>
        </div>
      </div>
    </Layout>
  )
}

export default About