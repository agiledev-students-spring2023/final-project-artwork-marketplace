import React, { useState, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
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
        {collapse === false && (
            <div className='collapse_section'>
                <button className='collapse_button collapse_button-Primary' onClick={handleCollapse}><FiMenu/></button>
            </div>
        )}
        {collapse === true && (
            <div className='collapse_section collapse_section-Active'>
                <button className='collapse_button' onClick={handleCollapse}><AiOutlineClose/></button>
                <div className='collapseActive_switch'>
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
                    
                </div>
                <div className="collapseActive_options">
                    <button className='collapseActive_option'><h5>Settings</h5></button>
                    <button className='collapseActive_option'><h5>Help & FAQ</h5></button>
                    <button className='collapseActive_option' onClick={handleLogOut}><h5>Log Out</h5></button>
                </div>
                
            </div>
        )}
    </>
  )
}

export default Settings