import React from 'react'
import LoginSub from '../Components/Login/loginsub'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'

const Login = () => {
    return (
      <div>
        <NewUserBackButton/>
        <LoginSub/>
      </div>
    )
}
  
export default Login