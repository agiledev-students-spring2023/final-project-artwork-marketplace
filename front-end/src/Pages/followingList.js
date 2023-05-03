import React from 'react'
import ViewFollowing from '../Components/followBanner/followBannerList'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const Followinglist = props => {
  return (
    <div>
        <Settings user={props.user} setuser={props.setuser}/>
      <ViewFollowing user={props.user} setuser={props.setuser}/>
      <Navbar user={props.user} />
    </div>
  )
}
  
export default Followinglist