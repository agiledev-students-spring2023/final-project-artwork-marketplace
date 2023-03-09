import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './landing.css'

 
const LandingPage = () => {
    return(
        <div>
            <Link to='/AboutUs' className='landing aboutUsButton'>?</Link>
            <div className='landing container landing__container'>
                <h1 className='landing title'>ARTWORK MARKETPLACE</h1>
                <div className='landing buttonSet'>
                    <Link to='/Login' className='landing button'>Log In</Link>
                    <Link to='/SignUp' className='landing button button-Primary'>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage