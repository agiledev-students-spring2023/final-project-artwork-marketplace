import React from 'react'
import LandingPage from '../Components/Landing/landing'

const Landing = props => {
  return (
    <div>
        <LandingPage user={props.user} />
    </div>
  )
}

export default Landing