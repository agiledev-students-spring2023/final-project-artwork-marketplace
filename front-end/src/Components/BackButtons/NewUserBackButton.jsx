import React from 'react'
import { Link } from 'react-router-dom'
import './backButton.css'

const NewUserBackButton = props => {
  return (
    <div className='NUback'>
        <Link to='/' className='backButton'>Back</Link>
    </div>
  )
}

export default NewUserBackButton