import React, {useState} from 'react'
import './landing.css'
//import BlueWave from '../../Assets/Pictures/blue-wave.jpeg'
 
const LandingPage = () => {
    return(
        <div>
            <h1 className='title'>ARTWORK MARKET</h1>
            <div className='buttonSet'>
                <button class="button" role="button">Log In</button>
                &nbsp;
                <button class="button" role="button">Create Account</button>
            </div>
            <p className='aboutUs'>About Us</p>
        </div>
    )
}

export default LandingPage