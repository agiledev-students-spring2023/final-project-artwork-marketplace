import React, {useState, useRef, useEffect } from 'react'
import './loginsub.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
 
const Loginsub = props => {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()

    const [randomFeaturedProduct, setRFP] = useState({})
    const [artistOfProd, setArtistOfProd] = useState({})

    useEffect(() => {
        const getLatestFeatured = async () => {
            const random_productID = Math.floor(Math.random() * 15) + 1;
            const getRandomProduct = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks/${random_productID}`)
            const random_product = getRandomProduct.data
            const getArtist = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${random_product.artist_id}`)
            const artist = getArtist.data
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
        try{
            const res = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/login`, newUser)
            const user = res.data
            props.setuser(user)
            navigate("/")
        } catch (err){
            console.log(err)
        }      
    }

    return(
        <div className='container LogIn__container'>
    	<div className="login_loginheader">
            <div className="login_featured">
                {/* Featured Artwork */}
                {randomFeaturedProduct && artistOfProd.name && (
                    <>
                        <h2>FEATURED ART OF THE DAY</h2>
                        <img className='login_featuredpic' src={randomFeaturedProduct.thumbnailURL} alt="" />
                        <h5 className="login_featuredInfo">
                            "{randomFeaturedProduct.name}" - {artistOfProd.name.full} 
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
                    min='6' 
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

