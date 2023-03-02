import React from 'react'
import './loginsub.css'
import BlueWave from '../../Assets/Pictures/blue-wave.jpeg'
 
const loginsub = () => {
    return(
        <div className="bodyset">
            <div className="photoimg">
              <img className="photopic" src={BlueWave} alt="" />
            </div>
            <h3 className='caption'>
                === Our Featured Artwork === 
            </h3>
            <h2 className='place'>
                Login
            </h2>
            <div className="loginset">        
                <input type='text' placeholder='Email'/>
                <input type='text' placeholder='Password'/>
                <input type='submit' value='Login' />  
            </div>
        </div>
    )
}

export default loginsub