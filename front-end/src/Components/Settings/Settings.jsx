import React, { useState, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Switch from 'react-switch'
import './settings.css'
import { useNavigate } from 'react-router-dom'

const Settings = props => {
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState(false)
  const [userType, setUserType] = useState(props.user.user)
  const [checked, setChecked] = useState(true)
  
  const handleLogOut = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/logout`, {withCredentials: true})
    if (res.data.success === true){
        alert("You have been logged out. Please Log In again to continue.")
        localStorage.removeItem("user")
        props.setuser({})
        navigate("/")
    }
  }

  useEffect(() => {
    const checkChecked = () => {
        if(props.user.user === "artist"){
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

  const handleUserChange = async () => {
    if(props.user.user === "artist"){
        try {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/changeToType/customer`, 
                {},
                {withCredentials: true, credentials: 'include'}
            )
            if(res.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                userObject.user = res.data
                localStorage.setItem("user", JSON.stringify(userObject))
                setUserType(res.data)
                props.setuser({...props.user, user: res.data})
                setChecked(false)
            }
        } catch (err) {
            if(err.response.status === 401){
                handleLogOut()
            }
            else{
                console.log(err)
            }
        }
        
    }
    else{
        try {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/changeToType/artist`, 
                {},
                {withCredentials: true, credentials: 'include'}
            )
            if(res.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                userObject.user = res.data
                localStorage.setItem("user", JSON.stringify(userObject))
                setUserType(res.data)
                props.setuser({...props.user, user: res.data})
                setChecked(true)
            }
        } catch (err) {
            if(err.response.status === 401){
                handleLogOut()
            }
            else{
                console.log(err)
            }
        }
    }
    navigate('/')
  }

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
                    {userType === "artist" &&(
                        <h3>Customer</h3>
                    )}
                    {userType === "customer" &&(
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
                    {userType === "artist" &&(
                        <h3 className='user_type'>{userType}</h3>
                    )}
                    {userType === "customer" &&(
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