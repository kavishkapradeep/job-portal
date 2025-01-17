import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'

import AppDownload from '../components/AppDownload.jsx'
import Footer from '../components/Footer.jsx'
import JobListing from '../components/jobListing.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <JobListing/>
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default Home