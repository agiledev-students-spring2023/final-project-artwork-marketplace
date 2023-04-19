import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import axios from 'axios'
import AM2 from '../../Assets/Pictures/AM2.png'

const SignUpSub = props => {
  const navigate = useNavigate()
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [userType, setUserType] = useState("Customer")
  const [passwordError, setPasswordError] = useState("")

  ;const handleSubmit = async (e) =>{
    e.preventDefault()
    if(passwordError !== ""){
      setPasswordError("Your passwords do not match! Try Again!")
    }
    else{
      const newUser = {
        user: userType,
        name: {
            first: firstNameRef.current.value,
            last: lastNameRef.current.value,
        },
        email: emailRef.current.value,
        password: passwordRef.current.value,
        products_uploaded: [],
        cart: [],
        saved: [], 
        following: [],
        followers: []
      }
      try{
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/register`, newUser)
        navigate("/Login")
      } catch (err) {
        setPasswordError(err)
      }
    }
  }

  const handlePasswordCheck = (e) => {
    if(confirmPasswordRef.current.value !== "" && passwordRef.current.value !== confirmPasswordRef.current.value){
      setPasswordError("Your passwords do not match!")
    }
    else{
      setPasswordError("")
    }
  }

  return (
    <div className='container SignUp__container'>
      {/* Error Message */}
      {passwordError !== "" && (
        <div className="errorMessage">
          <h5 className="messagee">
            {passwordError}
          </h5>
        </div>
      )}
    	{/* Logo */}
      
      <div className='s_l'>
        <img className='signup_logopic_phrase' src={AM2} alt="" />
      </div>
      
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
          <div className="signup_nameInputs">
            <input 
              className='textField'
              type='text' 
              placeholder='First Name'
              ref={firstNameRef}
            />
            <input 
              className='textField'
              type='text' 
              placeholder='Last Name'
              ref={lastNameRef}
            /> 
          </div>
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
          <input 
            className='textField'
            type='password'
            min='8' 
            placeholder='Confirm Password'
            onInput={(e) => handlePasswordCheck(e)}
            ref={confirmPasswordRef}
          />
          <button type="submit" className="signup_button signup_button-Primary">Register</button>
        </div>
      </form>
    </div>
  )
}

  export default SignUpSub 