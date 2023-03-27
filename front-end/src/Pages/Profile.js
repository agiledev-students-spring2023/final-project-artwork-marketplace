import React from 'react'
import ProfileSub from '../Components/Profile/profileSub'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'

const Profile = props => {
  return (
    <div>
      <Settings user={props.user} setuser={props.setuser}/>
      <ProfileSub user={props.user} />
      <Navbar user={props.user} />
    </div>
  )
}
  
export default Profile