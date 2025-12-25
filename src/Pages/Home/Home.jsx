import React from 'react'

import Hero from '../../Components/Home/Hero.jsx'
import Services from '../../Components/Home/Services.jsx'
import TrustedHireSection from '../../Components/Home/TrustedHireSection.jsx'
import Testimonials from '../../Components/Home/Testimonials.jsx'
import FinalCTA from '../../Components/Home/FinalCTA.jsx'

import MostHiredWorkers from "../../Components/Home/MostHiredWorkers.jsx";
import TopRatedWorkers from "../../Components/Home/TopRatedWorkers.jsx";
const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Services />
       <MostHiredWorkers />
      <TrustedHireSection />
     <TopRatedWorkers />
      <Testimonials />
      
      <FinalCTA />
    </div>
  )
}

export default Home
