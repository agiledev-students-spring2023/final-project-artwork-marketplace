import React from 'react'
import ViewItemSub from '../Components/ViewItem/viewItemSub'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const ViewItem = props => {
    return (
      <div>
      <motion.div
        initial={{opacity: 0, y: '100%'}}
        animate={{opacity: 1, y: '0%'}}
        exit={{opacity: 0, y: '100%'}}
        transition={{duration: 1}}
        key={"ViewItemPage"}
      >
        <Settings user={props.user} setuser={props.setuser}/>
        <ViewItemSub user={props.user} />
      </motion.div>
        <Navbar user={props.user} />
      </div>
    )
}
  
export default ViewItem