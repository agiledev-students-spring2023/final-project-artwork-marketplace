import React from 'react'
import AboutMembers from '../Components/AboutUs/aboutMembers'
import AboutProject from '../Components/AboutUs/aboutProject'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'

const AboutUs = props => {
  return (
    <div>
        <NewUserBackButton user={props.user} />
        <AboutProject user={props.user} />
        <AboutMembers user={props.user} />
    </div>
  )
}

export default AboutUs