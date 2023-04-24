import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'
import { motion, AnimatePresence } from 'framer-motion'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Cart = props => {
  const [cartSwitch, setCartSwitch] = useState("cart")
  const [userCartList, setUserCartList] = useState([])
  const [userSavedList, setUserSavedList] = useState([])
  const navigate = useNavigate()
  
  const handleLogOut = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/logout`, {withCredentials: true})
    if (res.data.success === true){
        alert("You have been logged out. Please Log In again to continue.")
        localStorage.removeItem("user")
        props.setuser({})
        navigate("/")
    }
  }

  useEffect(() => {
    const getCart = async () => {
        try{
            const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}`, 
                {withCredentials: true}
            )
            const user = getUser.data    
            const userCart = user.cart
            const userSaved = user.saved
            setUserCartList(userCart)
            setUserSavedList(userSaved)
        } catch (err){
            if(err.response.status === 401){
                handleLogOut()
            }
            else{
                console.log(err)
            }
        }
    }
    getCart()
  }, [])

  const handleRemoveFromCart = async (artworkId) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/removeFromCart/${artworkId}`, 
            {},
            {withCredentials: true}
        )
        if(res.status === 200){
            const userObject = JSON.parse(localStorage.getItem("user"))
            userObject.cart = res.data
            localStorage.setItem("user", JSON.stringify(userObject))
            setUserCartList(res.data)
            props.setuser({...props.user, cart: res.data})
        }
    } catch (err){
        if(err.response.status === 401){
            handleLogOut()
        }
        else{
            console.log(err)
        }
    }
  }

  const handleRemoveFromSaved = async (artworkId) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/removeFromSaved/${artworkId}`, 
            {},
            {withCredentials: true}
        )
        if(res.status === 200){
            const userObject = JSON.parse(localStorage.getItem("user"))
            userObject.saved = res.data
            localStorage.setItem("user", JSON.stringify(userObject))
            setUserSavedList(res.data)
            props.setuser({...props.user, saved: res.data})
        }
    } catch (err){
        if(err.response.status === 401){
            handleLogOut()
        }
        else{
            console.log(err)
        }
    }
  }

  const handleMoveToSaved = async (artworkId) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/removeFromCart/${artworkId}`, 
            {},
            {withCredentials: true}
        )
        if(res.status === 200){
            const userObject = JSON.parse(localStorage.getItem("user"))
            userObject.cart = res.data
            localStorage.setItem("user", JSON.stringify(userObject))
            setUserCartList(res.data)
            props.setuser({...props.user, cart: res.data})
            const res2 = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/addToSaved/${artworkId}`,
                {},
                {withCredentials: true}
            )
            if(res2.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                userObject.saved = res2.data
                localStorage.setItem("user", JSON.stringify(userObject))
                setUserSavedList(res2.data)
                props.setuser({...props.user, saved: res2.data})
            }
        }
    } catch (err){
        if(err.response.status === 401){
            handleLogOut()
        }
        else{
            console.log(err)
        }
    }
  }

  const handleMoveToCart = async (artworkId) => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/removeFromSaved/${artworkId}`, 
            {},
            {withCredentials: true}
        )
        if(res.status === 200){
            const userObject = JSON.parse(localStorage.getItem("user"))
            userObject.saved = res.data
            localStorage.setItem("user", JSON.stringify(userObject))
            setUserSavedList(res.data)
            props.setuser({...props.user, saved: res.data})
            const res2 = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}/addToCart/${artworkId}`,
                {},
                {withCredentials: true}
            )
            if(res2.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                userObject.cart = res2.data
                localStorage.setItem("user", JSON.stringify(userObject))
                setUserCartList(res2.data)
                props.setuser({...props.user, cart: res2.data})
            }
        }
    } catch (err){
        if(err.response.status === 401){
            handleLogOut()
        }
        else{
            console.log(err)
        }
    }
  }

  const handleCheckout = async () => {
    try{
        const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/checkout/user/${props.user._id}`, 
            {},
            {withCredentials: true}
        )
        if(res.status === 200){
            const userObject = JSON.parse(localStorage.getItem("user"))
            userObject.cart = res.data.cart
            userObject.purchased = res.data.purchased
            localStorage.setItem("user", JSON.stringify(userObject))
            setUserCartList(res.data.cart)
            props.setuser({...props.user, cart: res.data.cart})
            props.setuser({...props.user, purchased: res.data.purchased})
            alert("Successfully checked out!")
        }
    } catch (err){
        if(err.response.status === 401){
            handleLogOut()
        }
        else{
            console.log(err)
        }
    }
  }
  

  return (
    <div>
        <div className="banner_cartHeading">
            <AnimatePresence mode={'wait'}>
            {cartSwitch === "cart" &&(
                <motion.h1 className="cartHeading"
                    initial={{opacity: 1, x: '-100%'}}
                    animate={{opacity: 1, x: '0%'}}
                    exit={{opacity: 1, x: '-100%'}}
                    transition={{duration: 0.25}}
                    key={"userCart"}
                >Your Cart</motion.h1>
            )}
            {cartSwitch === "saved" &&(
                <motion.h1 className="cartHeading"
                    initial={{opacity: 1, x: '100%'}}
                    animate={{opacity: 1, x: '0%'}}
                    exit={{opacity: 1, x: '100%'}}
                    transition={{duration: 0.25}}
                    key={"userSaved"}
                >Your Saved List</motion.h1>
            )}
            </AnimatePresence>
        </div>
        <div className="CartSavedSwitch">
            {cartSwitch === "cart" &&(
                <>
                    <button 
                        className="cartButton cartButton-primary" 
                        onClick={() => setCartSwitch("cart")}
                    >
                        Shopping Cart
                    </button>
                    <button 
                        className="cartButton" 
                        onClick={() => setCartSwitch("saved")}
                    >
                        Saved
                    </button>
                </>
            )}
            {cartSwitch === "saved" &&(
                <>
                    <button 
                        className="cartButton" 
                        onClick={() => setCartSwitch("cart")}
                    >
                        Shopping Cart
                    </button>
                    <button 
                        className="cartButton cartButton-primary" 
                        onClick={() => setCartSwitch("saved")}
                    >
                        Saved
                    </button>
                </>
            )}
        </div>
        <div className="container CartProductsDisplay__Container">
            <AnimatePresence mode={'wait'}>
            {cartSwitch === "cart" &&(
                <motion.div
                    initial={{opacity: 1, x: '-100%'}}
                    animate={{opacity: 1, x: '0%'}}
                    exit={{opacity: 1, x: '-100%'}}
                    transition={{duration: 0.25}}
                    key={"userCartItems"}
                >
                    {userCartList.length !== 0 && (
                        <div className="artworkColumnDisplay">
                            {userCartList.map((artwork) =>
                                <div className="artworkCartCard" key={artwork._id}>
                                    <div className="artworkCardImage">
                                        <Link to={`/ViewItem/${artwork._id}`}>
                                            <img src={process.env.REACT_APP_SERVER_HOSTNAME + artwork.thumbnailURL} />
                                        </Link>
                                    </div>
                                    <div className="artworkCartText">
                                        <div className="artworkCartInformation">
                                            <h4 className='artworkCartName'>"{artwork.name}"</h4>
                                            {artwork.status === "Sold" && (
                                                <>
                                                    <h5 className='artworkCartPrice sold'>$ {artwork.price}</h5>
                                                    <h5 className='artworkCartPrice sold'>{artwork.status}</h5>
                                                </>
                                            )}
                                            {artwork.status === "Available" && (
                                                <>
                                                    <h5 className='artworkCartPrice available'>$ {artwork.price}</h5>
                                                    <h5 className='artworkCartPrice available'>{artwork.status}</h5>
                                                </>
                                            )}
                                        </div>
                                        <div className="artworkCartActions">
                                            <button onClick={() => handleRemoveFromCart(artwork._id)}>Remove</button>
                                            <button onClick={() => handleMoveToSaved(artwork._id)}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="cartCheckout">
                                <button onClick={handleCheckout}>Checkout Cart</button>
                            </div>
                        </div>
                    )}
                    {(userCartList.length === 0 || !userCartList) &&(
                        <div className="emptyCart">
                            <h4>Sorry, your cart appears to be empty!</h4>
                        </div>
                    )}
                </motion.div>
            )}
            {cartSwitch === "saved" &&(
                <motion.div
                    initial={{opacity: 1, x: '100%'}}
                    animate={{opacity: 1, x: '0%'}}
                    exit={{opacity: 1, x: '100%'}}
                    transition={{duration: 0.25}}
                    key={"userSavedItems"}
                >
                    {userSavedList.length !== 0 && (
                        <div className="artworkColumnDisplay">
                            {userSavedList.map((artwork) =>
                                <div className="artworkCartCard">
                                    <div className="artworkCardImage">
                                        <Link to={`/ViewItem/${artwork._id}`}>
                                            <img src={process.env.REACT_APP_SERVER_HOSTNAME + artwork.thumbnailURL} />
                                        </Link>
                                    </div>
                                    <div className="artworkCartText">
                                        <div className="artworkCartInformation">
                                            <h4 className='artworkCartName'>"{artwork.name}"</h4>
                                            {artwork.status === "sold" && (
                                                <>
                                                    <h5 className='artworkCartPrice sold'>$ {artwork.price}</h5>
                                                    <h5 className='artworkCartPrice sold'>{artwork.status}</h5>
                                                </>
                                            )}
                                            {artwork.status === "available" && (
                                                <>
                                                    <h5 className='artworkCartPrice available'>$ {artwork.price}</h5>
                                                    <h5 className='artworkCartPrice available'>{artwork.status}</h5>
                                                </>
                                            )}
                                        </div>
                                        <div className="artworkCartActions">
                                            <button onClick={() => handleRemoveFromSaved(artwork._id)}>Remove</button>
                                            <button onClick={() => handleMoveToCart(artwork._id)}>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {(userSavedList.length === 0 || !userSavedList) &&(
                        <div className="emptyCart">
                            <h4>Sorry, your saved list appears to be empty!</h4>
                        </div>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    </div>
  )
}

export default Cart