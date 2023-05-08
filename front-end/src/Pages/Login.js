import React, {useState} from 'react'
import LoginSub from '../Components/Login/loginsub'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'
import { motion } from 'framer-motion'

const Login = props => {
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
        key={"LoginPage"}
      >
        <NewUserBackButton user={props.user} />
        <LoginSub user={props.user} setuser={props.setuser} />
      </motion.div>
    )
}
  
export default Login