import React from 'react'
import {NavLink} from 'react-router-dom'
import {FiHome, FiUser, FiShoppingCart} from 'react-icons/fi'
import {IoIosAdd} from 'react-icons/io'
import {RiUserStarLine, RiUserHeartLine} from 'react-icons/ri'
import './navbar.css'

const Navbar = props => {
  return (
    <nav>
      {props.user.user === "artist" && (
        <>
            {/* Home */}
            <NavLink 
                exact="true"
                activeclassname="Home" 
                to='/' >
                <FiHome/>
            </NavLink>

            {/* Add Art */}
            <NavLink 
                exact="true"
                activeclassname="Add Art" 
                to='/AddArt' >
                <IoIosAdd/>
            </NavLink>

            {/* Artist Profile */}
            <NavLink 
                exact="true"
                activeclassname="Profile" 
                to={`/Profile/${props.user._id}`} >
                <FiUser/>
            </NavLink>
        </>
      )}
      {props.user.user === "customer" &&(
        <>
            {/* Cart */}
            <NavLink 
                exact="true"
                activeclassname="Cart" 
                to='/Cart' >
                <FiShoppingCart/>
            </NavLink>

            {/* You */}
            <NavLink 
                exact="true"
                activeclassname="My Profile" 
                to={`/Profile/${props.user._id}`} >
                <FiUser/>
            </NavLink>

            {/* Home */}
            <NavLink 
                exact="true"
                activeclassname="Home" 
                to='/' >
                <FiHome/>
            </NavLink>

            {/* Rising Artists */}
            <NavLink 
                exact="true"
                activeclassname="Rising Artists" 
                to='/RisingArtists' >
                <RiUserStarLine/>
            </NavLink>

            {/* Following */}
            <NavLink 
                exact="true"
                activeclassname="Following" 
                to='/Following' >
                <RiUserHeartLine/>
            </NavLink>
        </>
      )}
    </nav>
  )
}

export default Navbar