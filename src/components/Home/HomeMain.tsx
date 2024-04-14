import React from 'react'
import Navbar from './Navbar'
import HomeBlog from '../Blogs/HomeBlog'
import Bottom from './Bottom'
import Footer from './Footer'

const HomeMain = () => {
  return (
    <div>
        <Navbar />
        <Bottom />
        <HomeBlog title='latest' />
        <Footer />
    </div>
  )
}

export default HomeMain