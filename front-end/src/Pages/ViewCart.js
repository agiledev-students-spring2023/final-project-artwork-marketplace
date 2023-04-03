import React from 'react'
import Cart from '../Components/Cart/Cart'
import Navbar from '../Components/Navbar/Navbar'
import { motion } from 'framer-motion'

const ViewCart = props => {
  return (
    <div>
      <motion.div
        initial={{opacity: 0, y: '100%'}}
        animate={{opacity: 1, y: '0%'}}
        exit={{opacity: 0, y: '100%'}}
        transition={{duration: 1}}
        key={"CartPage"}
      >
        <Cart user={props.user} />
      </motion.div>
        <Navbar user={props.user} />
    </div>
  )
}

export default ViewCart