import React from 'react'
import {NavLink} from 'react-router-dom'
import {FiHome, FiUser} from 'react-icons/fi'
import {IoIosAdd} from 'react-icons/io'
import './navbar.css'

const ArtistNavbar = () => {
  return (
    <nav>
      
      {/* Home */}
      <NavLink 
        exact
        activeClassName="home" 
        to='/Home' >
        <FiHome/>
      </NavLink>

      {/* Add Art */}
      <NavLink 
        exact
        activeClassName="addArt" 
        to='/AddArt' >
        <IoIosAdd/>
      </NavLink>

      {/* Artist Profile */}
      <NavLink 
        exact
        activeClassName="artistProfile" 
        to='/ArtistProfile' >
        <FiUser/>
      </NavLink>

    </nav>
  )
}

export default ArtistNavbar