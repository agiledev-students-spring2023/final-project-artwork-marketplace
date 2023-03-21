import React, {useState} from 'react'
import LoginSub from '../Components/Login/loginsub'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'

const Login = props => {
    return (
      <div>
        <NewUserBackButton user={props.user} />
        <LoginSub user={props.user} setuser={props.setuser} />
      </div>
    )
}
  
export default Login