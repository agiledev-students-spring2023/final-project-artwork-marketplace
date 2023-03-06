import React from 'react'
import AboutMembers from '../Components/AboutUs/aboutMembers'
import AboutProject from '../Components/AboutUs/aboutProject'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'

const AboutUs = () => {
  return (
    <div>
        <NewUserBackButton/>
        <AboutProject/>
        <AboutMembers/>
    </div>
  )
}

export default AboutUs