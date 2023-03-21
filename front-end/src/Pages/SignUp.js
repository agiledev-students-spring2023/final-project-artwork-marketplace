import React from 'react'
import SignUpSub from '../Components/Signup/signUpSub'
import NewUserBackButton from '../Components/BackButtons/NewUserBackButton'

const SignUp = props => {
  return (
    <div>
        <NewUserBackButton user={props.user} />
        <SignUpSub user={props.user} />
    </div>
  )
}

export default SignUp 