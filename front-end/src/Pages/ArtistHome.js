import React from 'react'
import ArtistNavbar from '../Components/Navbar/ArtistNavbar'
import ArtistProducts from '../Components/ArtistHome/ArtistProducts'


const ArtistHome = () => {

  return (
    <div>
      <ArtistProducts/>
      <ArtistNavbar/>
    </div>
  )
}

export default ArtistHome