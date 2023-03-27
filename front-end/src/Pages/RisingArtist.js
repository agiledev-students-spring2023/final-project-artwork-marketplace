import React from 'react'
import Risingartistsub from '../Components/RisingArtist/risingartistsub'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'

const thisRisingArtist = props => {
    return (
      <div>
        <Settings user={props.user} setuser={props.setuser}/>
        <Risingartistsub user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default thisRisingArtist