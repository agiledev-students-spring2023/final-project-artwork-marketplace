import React, {useState} from 'react'
import './loginsub.css'
import BlueWave from '../../Assets/Pictures/blue-wave.jpeg'
 
const Loginsub = () => {
    const [theemail,setTheemail] = useState("")
    const [thepassword,setThepassword] = useState("")

    function handleSubmit(event){
        event.preventDefault()
        /* test */ 
        console.log('SUBMIT TEST')
        console.log('email=',theemail)
        console.log('password=',thepassword)
    }

    return(
        <div className="bodyset">
            <div className="photoimg">
              <img className="photopic" src={BlueWave} alt="" />
            </div>
            <h3 className='caption'>
                === Our Featured Artwork === 
            </h3>
            <h3 className='loginplace'>
                Login
            </h3>
            <div className="loginset">        
                <input type='text' placeholder='Email' value={theemail} onChange={(e) => setTheemail(e.target.value)} />
                <input type='text' placeholder='Password' value={thepassword} onChange={(e) => setThepassword(e.target.value)} />
                {thepassword.length > 10 ? <h3 className='caption'>Password is OK</h3>: <h3 className='caption'>Too short (minimum length = 10) </h3>}
                <form onSubmit={handleSubmit}>
                    <input type='submit' value='Login' />  
                </form>
            </div>
        </div>
    )
}

export default Loginsub

