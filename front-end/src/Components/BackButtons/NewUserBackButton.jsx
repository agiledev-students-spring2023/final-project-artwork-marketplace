import React from 'react'
import { Link } from 'react-router-dom'
import './backButton.css'

const NewUserBackButton = () => {
  return (
    <div className='NUback'>
        <Link to='/Landing' className='backButton'>Back</Link>
    </div>
  )
}

export default NewUserBackButton