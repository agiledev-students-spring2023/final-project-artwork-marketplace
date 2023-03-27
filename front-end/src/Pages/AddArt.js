import React from 'react'
import AddArtWork from '../Components/AddArt/addartwork'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'

const AddArt = props => {
    return (
      <div>
        <Settings user={props.user} setuser={props.setuser}/>
        <AddArtWork user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default AddArt