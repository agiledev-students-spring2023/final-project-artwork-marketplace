import React from 'react'
import LandingPage from '../Components/Landing/landing'
import CategoryDisplay from '../Components/CustomerHomePage/CategoryDisplay'
import ArtistProducts from '../Components/ArtistHome/ArtistProducts'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'

const Home = props => {
  return (
    <div>
      {!props.user.user &&(
        <LandingPage user={props.user} />
      )}
      {props.user.user &&(
        <>
            <Settings user={props.user} setuser={props.setuser} />
            {props.user.user === "Customer" && (
                <CategoryDisplay user={props.user} />
            )}
            {props.user.user === "Artist" && (
                <ArtistProducts user={props.user} />
            )}
            <Navbar user={props.user} />
        </>
      )}  
    </div>
  )
}

export default Home