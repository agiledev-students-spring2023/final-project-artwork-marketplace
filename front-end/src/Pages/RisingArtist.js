import React from 'react'
import Risingartistsub from '../Components/RisingArtist/risingartistsub'
import Navbar from '../Components/Navbar/Navbar'

const thisRisingArtist = props => {
    return (
      <div>
        <Risingartistsub user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default thisRisingArtist