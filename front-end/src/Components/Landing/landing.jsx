import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './landing.css'

 
const LandingPage = () => {
    return(
        <>
            <Link to='/AboutUs' className='aboutUsButton'>?</Link>
            <div className='container landing__container'>
                <h1 className='title'>ARTWORK MARKETPLACE</h1>
                <div className='buttonSet'>
                    <Link to='/Login' className='button'>Log In</Link>
                    <Link to='/SignUp' className='button button-Primary'>Sign Up</Link>
                </div>
            </div>
        </>
    );
}

export default LandingPage