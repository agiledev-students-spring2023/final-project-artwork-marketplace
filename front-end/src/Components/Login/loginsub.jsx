import React, {useState, useRef, useEffect } from 'react'
import './loginsub.css'
import Logo from '../../Assets/Pictures/logo-placeholder.jpeg'
import AllUsers from '../../SchemaSamples/AllUsers'
import AllProducts from '../../SchemaSamples/AllProducts'
import { useNavigate } from 'react-router-dom'
 
const Loginsub = props => {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()

    const [randomFeaturedProduct, setRFP] = useState({})
    const [artistOfProd, setArtistOfProd] = useState({})

    useEffect(() => {
        const getLatestFeatured=()=>{
            const random_productID = Math.floor(Math.random() * 15) + 1;
            const random_product = AllProducts.find(product => product._id === random_productID)
            const artist = AllUsers.find(user => user._id === random_product.artist_id)
            setRFP(random_product)
            setArtistOfProd(artist)
        }
        getLatestFeatured()
    }, [])

    ;const handleSubmit = async (e) =>{
        e.preventDefault()
        const newUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
        /* check server here but for now just check our list
        try{
          await axios.get(...)
        }
        */
        const user = AllUsers.find(user => user.email.toLowerCase() === newUser.email.toLowerCase())
        props.setuser(user)
        navigate("/")
    }

    return(
        <div className='container LogIn__container'>
    	<div className="login_loginheader">
            <div className="login_featured">
                {/* Featured Artwork */}
                {randomFeaturedProduct && (
                    <>
                        <h2>FEATURED ART OF THE DAY</h2>
                        <img className='login_featuredpic' src={randomFeaturedProduct.thumbnailURL} alt="" />
                        <h5 className="login_featuredInfo">
                            "{randomFeaturedProduct.name}" - {artistOfProd.name}
                        </h5>
                    </>
                )}
                
            </div>
        </div>
        {/* User Login Info */}
        <form onSubmit={handleSubmit}>
        {/* Sign Up */}
            <div className="login_loginset">     
                <input 
                    className='textField'
                    type='email' 
                    placeholder='Email'
                    ref={emailRef}
                />
                <input 
                    className='textField'
                    type='password'
                    min='8' 
                    placeholder='Password'
                    ref={passwordRef}
                />
                <button type="submit" className="signup_button signup_button-Primary">Login</button>
            </div>
        </form>
    </div>
    )
}

export default Loginsub

