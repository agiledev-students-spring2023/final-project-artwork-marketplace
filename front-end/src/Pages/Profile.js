import React from 'react'
import ProfileSub from '../Components/Profile/profileSub'
import Navbar from '../Components/Navbar/Navbar'

const Profile = props => {
    return (
      <div>
        <ProfileSub user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default Profile