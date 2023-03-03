import React from 'react'
import './signup.css'
import Logo from '../../Assets/Pictures/logo-placeholder.jpeg'

const signUpSub = () => {
    return (
      <div>
    	<div>
        <div>
            <img className="logopic" src={Logo} alt="" />
        </div>
  	    <p>User Category</p>
    	</div>
      <div className = "checkmarkset"> 
        <label class="container">Artist
            <input type="radio" checked="checked" name="radio"/>
            <span class="checkmark"></span>
          </label>
          <label class="container">Customer
            <input type="radio" name="radio"/>
            <span class="checkmark"></span>
          </label>
      </div>
      <div className="signupset">   
        <input type='text' Placeholder='Name'/>  
        <input type='text' placeholder='Email'/>
        <input type='text' placeholder='Password'/>
        <input type='submit' value='Register'/>  
      </div>
     </div>
    )
  }

  export default signUpSub 