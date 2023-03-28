import React from 'react'
import ViewItemSub from '../Components/ViewItem/viewItemSub'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'

const ViewItem = props => {
    return (
      <div>
        <Settings user={props.user} setuser={props.setuser}/>
        <ViewItemSub user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default ViewItem