import React from 'react'
import {NavLink} from 'react-router-dom'
import {FiHome, FiUser, FiShoppingCart} from 'react-icons/fi'
import {IoIosAdd} from 'react-icons/io'
import {RiUserStarLine, RiUserHeartLine} from 'react-icons/ri'
import './navbar.css'

const Navbar = props => {
  return (
    <nav>
      {props.user.user === "Artist" && (
        <>
            {/* Home */}
            <NavLink 
                exact
                activeClassName="Home" 
                to='/' >
                <FiHome/>
            </NavLink>

            {/* Add Art */}
            <NavLink 
                exact
                activeClassName="Add Art" 
                to='/AddArt' >
                <IoIosAdd/>
            </NavLink>

            {/* Artist Profile */}
            <NavLink 
                exact
                activeClassName="Profile" 
                to='/Profile' >
                <FiUser/>
            </NavLink>
        </>
      )}
      {props.user.user === "Customer" &&(
        <>
            {/* Cart */}
            <NavLink 
                exact
                activeClassName="Cart" 
                to='/Cart' >
                <FiShoppingCart/>
            </NavLink>

            {/* You */}
            <NavLink 
                exact
                activeClassName="My Profile" 
                to='/MyProfile' >
                <FiUser/>
            </NavLink>

            {/* Home */}
            <NavLink 
                exact
                activeClassName="Home" 
                to='/' >
                <FiHome/>
            </NavLink>

            {/* Rising Artists */}
            <NavLink 
                exact
                activeClassName="Rising Artists" 
                to='/RisingArtists' >
                <RiUserStarLine/>
            </NavLink>

            {/* Following */}
            <NavLink 
                exact
                activeClassName="Following" 
                to='/Following' >
                <RiUserHeartLine/>
            </NavLink>
        </>
      )}
    </nav>
  )
}

export default Navbar