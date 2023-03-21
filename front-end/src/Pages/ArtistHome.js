import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ArtistProducts from '../Components/ArtistHome/ArtistProducts'


const ArtistHome = props => {

  return (
    <div>
      <ArtistProducts user={props.user} />
      <Navbar user={props.user} />
    </div>
  )
}

export default ArtistHome