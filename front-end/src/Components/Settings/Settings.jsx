import React, { useState, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import Switch from 'react-switch'
import './settings.css'

const Settings = props => {
  const [collapse, setCollapse] = useState(false)
  const [userType, setUserType] = useState(props.user.user)
  const [checked, setChecked] = useState(true)
  
  useEffect(() => {
    const checkChecked = () => {
        if(props.user.user === "Artist"){
            setChecked(true)
        }
        else{
            setChecked(false)
        }
      }
      checkChecked()
  }, [])

  const handleCollapse = () => {
    const negation = !collapse
    setCollapse(negation)
  }

  const handleLogOut = () => {
    props.setuser({})
  }

  const handleUserChange = (async () => {
    if(props.user.user === "Artist"){
        setUserType("Customer")
        props.setuser({... props.user, user: "Customer"})
        setChecked(false)
    }
    else{
        setUserType("Artist")
        props.setuser({... props.user, user: "Artist"})
        setChecked(true)
    }
  })

  return (
    <>
        <AnimatePresence mode={'wait'}>
        {collapse === false && (
            <motion.div className='collapse_section' 
                key={'collapse_section'}    
                initial={{opacity:0}} 
                animate={{opacity:1}}
                transition={{duration:0.3}} 
                exit={{opacity:0}}
            >
                <h2 className="welcome_CustomerHeading">Welcome, {props.user.name.first}!</h2>
                <button className='collapse_button collapse_button-Primary' onClick={handleCollapse}><FiMenu/></button>
            </motion.div>
        )}
        {collapse === true && (
            <motion.div className='collapse_section-Active'
                key={'collapse_section-Active'}
                initial={{opacity:0}} 
                animate={{opacity:1, y: '0%'}}
                transition={{duration:0.8, ease: "easeInOut", delayChildren: 0.6}} 
                exit={{y: '-800%'}}
            >
                <motion.button className='collapse_button' onClick={handleCollapse}
                    initial={{opacity:0}} 
                    animate={{opacity:1}}
                    transition={{duration:0.3}} 
                    exit={{opacity:0}}
                ><AiOutlineClose/></motion.button>
                <motion.div className='collapseActive_switch'
                    initial={{opacity:0}} 
                    animate={{opacity:1}}
                    transition={{duration:0.3}} 
                    exit={{opacity:0}}
                >
                    {userType === "Artist" &&(
                        <h3>Customer</h3>
                    )}
                    {userType === "Customer" &&(
                        <h3 className='user_type'>{userType}</h3>
                    )}
                    <div className="switch">
                        <Switch 
                            checked={checked}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onColor="#fff"
                            offColor="#fff"
                            onHandleColor="#357637"
                            offHandleColor="#357637"
                            onChange={handleUserChange}
                        />
                    </div>
                    {userType === "Artist" &&(
                        <h3 className='user_type'>{userType}</h3>
                    )}
                    {userType === "Customer" &&(
                        <h3>Artist</h3>
                    )}
                    
                </motion.div>
                <div className="collapseActive_options">
                    <motion.button className='collapseActive_option'
                        initial={{opacity:0, x: '100%'}} 
                        animate={{opacity:1, x: '0%'}}
                        transition={{duration:0.1}} 
                        exit={{opacity:1, x: '100%'}}
                    ><h5>Settings</h5></motion.button>
                    <motion.button className='collapseActive_option'
                        initial={{opacity:0, x: '100%'}} 
                        animate={{opacity:1, x: '0%'}}
                        transition={{duration:0.2}} 
                        exit={{opacity:1, x: '100%'}}
                    ><h5>Help & FAQ</h5></motion.button>
                    <motion.button className='collapseActive_option' onClick={handleLogOut}
                        initial={{opacity:0, x: '100%'}} 
                        animate={{opacity:1, x: '0%'}}
                        transition={{duration:0.3}} 
                        exit={{opacity:1, x: '100%'}}
                    ><h5>Log Out</h5></motion.button>
                </div>
                
            </motion.div>
        )}
        </AnimatePresence>
    </>
  )
}

export default Settings