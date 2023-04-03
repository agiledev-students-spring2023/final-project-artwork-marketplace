import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductDisplay from '../Components/CategoryPage/ProductDisplay'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const Category = props => {
    return (
      <div>
        <motion.div
            initial={{opacity: 0, y: '100%'}}
            animate={{opacity: 1, y: '0%'}}
            exit={{opacity: 0, y: '100%'}}
            transition={{duration: 1}}
            key={"CategoryPage"}
        >
          <Settings user={props.user} setuser={props.setuser}/>
          <ProductDisplay user={props.user} />
        </motion.div>
        <Navbar user={props.user} />
      </div>
    )
}
  
export default Category