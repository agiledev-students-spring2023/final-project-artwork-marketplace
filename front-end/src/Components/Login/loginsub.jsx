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
            <h2 className='place'>
                Login
            </h2>
            <div className="loginset">        
                <input type='text' placeholder='Email' value={theemail} onChange={(e) => setTheemail(e.target.value)} />
                <input type='text' placeholder='Password' value={thepassword} onChange={(e) => setThepassword(e.target.value)} />
                <form onSubmit={handleSubmit}>
                    <input type='submit' value='Login' />  
                </form>
            </div>
        </div>
    )
}

export default Loginsub

