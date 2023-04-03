import React from 'react'
import SignUpSub from '../Components/Signup/signUpSub'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'
import { motion } from 'framer-motion'

const SignUp = props => {
  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
        key={"SignUpPage"}
      >
        <NewUserBackButton user={props.user} />
        <SignUpSub user={props.user} />
    </motion.div>
  )
}

export default SignUp 