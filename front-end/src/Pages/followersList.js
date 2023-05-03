import React from 'react'
import ViewFollowers from '../Components/followerBanner/followerBannerList'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const Followerslist = props => {
  return (
    <div>
        <Settings user={props.user} setuser={props.setuser}/>
      <ViewFollowers user={props.user} setuser={props.setuser}/>
      <Navbar user={props.user} />
    </div>
  )
}
  
export default Followerslist