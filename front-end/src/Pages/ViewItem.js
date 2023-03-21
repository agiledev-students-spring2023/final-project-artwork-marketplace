import React from 'react'
import ViewItemSub from '../Components/ViewItem/viewItemSub'
import Navbar from '../Components/Navbar/Navbar'

const ViewItem = props => {
    return (
      <div>
        <ViewItemSub user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default ViewItem