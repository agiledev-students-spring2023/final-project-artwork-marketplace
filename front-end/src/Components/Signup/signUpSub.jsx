import React from 'react'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import Logo from '../../Assets/Pictures/logo-placeholder.jpeg'

const SignUpSub = () => {
  const navigate = useNavigate()
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userType, setUserType] = useState("Customer")
  
  ;const handleSubmit = async (e) =>{
    e.preventDefault()
    const newUser = {
      user: userType,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    /* check server here but for now just print user data to console
    try{
      await axios.post(...)
    }
    */
    console.log(newUser)
    navigate("/Login")
  }

  return (
    <div className='container SignUp__container'>
      
    	{/* Logo */}
      <img className='signup_logopic' src={Logo} alt="" />
      
      {/* User Info */}
      <form onSubmit={handleSubmit}>
        {/* User Category */}
        <div className = "signup_check">
          <div 
            className="radioButton"
            onClick={() => {setUserType("Artist")}}
          >
            <input 
              type="radio" 
              checked={userType === "Artist"}
              name="userType"
            />
            <p className="radioLabel">Artist</p>
          </div>
          <div 
            className="radioButton"
            onClick={() => {setUserType("Customer")}}
          >
            <input 
              type="radio" 
              checked={userType === "Customer"}
              name="userType"
            />
            <p className="radioLabel">Customer</p>
          </div>
        </div>
        {/* Sign Up */}
        <div className="signup_signupset">   
          <input 
            className='textField'
            type='text' 
            placeholder='Name'
            ref={nameRef}
          />  
          <input 
            className='textField'
            type='email' 
            placeholder='Email'
            ref={emailRef}
          />
          <input 
            className='textField'
            type='password'
            min='8' 
            placeholder='Password'
            ref={passwordRef}
          />
          <button type="submit" className="signup_button signup_button-Primary">Register</button>
        </div>
      </form>
    </div>
  )
}

  export default SignUpSub 