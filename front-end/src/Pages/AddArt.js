import React from 'react'
import AddArtWork from '../Components/AddArt/addartwork'
import Navbar from '../Components/Navbar/Navbar'

const AddArt = props => {
    return (
      <div>
        <AddArtWork user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default AddArt