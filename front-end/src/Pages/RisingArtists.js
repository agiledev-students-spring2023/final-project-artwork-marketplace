import React from 'react'
import RisingArtistSub from '../Components/RisingArtist/Risingartistsub'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const RisingArtists = props => {
    return (
      <div>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1.5}}
          key={"RisingArtistsSettings"}
        >
          <Settings user={props.user} setuser={props.setuser}/>
        </motion.div>
        <motion.div
        initial={{opacity: 0, y: '100%'}}
        animate={{opacity: 1, y: '0%'}}
        exit={{opacity: 0, y: '100%'}}
        transition={{duration: 1}}
        key={"RisingArtistPage"}
        >
          <RisingArtistSub user={props.user} setuser={props.setuser}/>
        </motion.div>
        <Navbar user={props.user} />
      </div>
    )
}
  
export default RisingArtists