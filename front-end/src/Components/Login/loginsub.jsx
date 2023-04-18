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
    const [loginError, setLoginError] = useState("")

    useEffect(() => {
        const getLatestFeatured = async () => {
            const getFeaturedProduct = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks/featuredArtwork`)
            const featured_product = getFeaturedProduct.data
            const artist = featured_product.artist_id
            setRFP(featured_product)
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
            if(res.status === 200){
                setLoginError("")
                if(res.data.success && res.data.id && res.data.token){
                    try {
                        const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${res.data.id}`,
                            {headers: {Authorization: `JWT ${res.data.token}`}, 
                        })
                        const user = getUser.data
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("user", JSON.stringify(user))
                        props.setuser(user)
                        navigate("/")
                    } catch (err) {
                        setLoginError(err.response.data.message)
                    }
                }
            }
        } catch (err){
            if(err.response.status === 400){
                setLoginError(err.response.data.message)
            }
            else{
                console.log(err.response.data)
            } 
        }      
    }

    return(
        <div className='container LogIn__container'>
            {loginError && (
                <div className="login_error">
                    {loginError}
                </div>
            )}
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

