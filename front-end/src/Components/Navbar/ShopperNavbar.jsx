import React from 'react'
import {NavLink} from 'react-router-dom'
import {FiHome, FiUser, FiShoppingCart} from 'react-icons/fi'
import {RiUserStarLine, RiUserHeartLine} from 'react-icons/ri'
import './navbar.css'

const ShopperNavbar = () => {
  
  return (
    <nav>

      {/* Cart */}
      <NavLink 
        exact
        activeClassName="cart" 
        to='/Cart' >
        <FiShoppingCart/>
      </NavLink>

      {/* You */}
      <NavLink 
        exact
        activeClassName="yourProfile" 
        to='/yourProfile' >
        <FiUser/>
      </NavLink>

      {/* Home */}
      <NavLink 
        exact
        activeClassName="home" 
        to='/' >
        <FiHome/>
      </NavLink>

      {/* Rising Artists */}
      <NavLink 
        exact
        activeClassName="artistProfile" 
        to='/RisingArtists' >
        <RiUserStarLine/>
      </NavLink>

      {/* Following */}
      <NavLink 
        exact
        activeClassName="following" 
        to='/Following' >
        <RiUserHeartLine/>
      </NavLink>
        
    </nav>
  )
}

export default ShopperNavbar