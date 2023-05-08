import React from 'react'
import AboutMembers from '../Components/AboutUs/aboutMembers'
import AboutProject from '../Components/AboutUs/aboutProject'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'
import { motion } from 'framer-motion'

const AboutUs = props => {
  return (
    <div>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
        key={"AboutUsPage"}
      >
        <NewUserBackButton user={props.user} />
        <AboutProject user={props.user} />
        <AboutMembers user={props.user} />
      </motion.div>
    </div>
  )
}

export default AboutUs