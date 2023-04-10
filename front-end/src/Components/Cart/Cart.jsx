import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'
import { motion, AnimatePresence } from 'framer-motion'
import axios from "axios"

const Cart = props => {
  const [cartSwitch, setCartSwitch] = useState("cart")
  const [userCartList, setUserCartList] = useState([])
  const [userSavedList, setUserSavedList] = useState([])
  
  // should be replaced with API
  useEffect(() => {
    const getCart = async () => {
        try{    
            const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
            const AllProducts = getProducts.data
            const userCart = props.user.cart
            const userSaved = props.user.saved
            const cartList = AllProducts.filter(product => userCart.includes(product._id))
            const savedList = AllProducts.filter(product => userSaved.includes(product._id))
            setUserCartList(cartList)
            setUserSavedList(savedList)
        } catch (err){
            console.log(err)
        }
    }
    getCart()
  }, [])

  return (
    <div>
        <div className="container cartHeading__Container">
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
                    {userCartList && (
                        <div className="artworkColumnDisplay">
                            {userCartList.map((artwork) =>
                                <div className="artworkCartCard" key={artwork._id}>
                                    <div className="artworkCardImage">
                                        <Link to={`/ViewItem/${artwork._id}`}>
                                            <img src={artwork.thumbnailURL} />
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
                                            <button>Remove</button>
                                            <button>Edit</button>
                                            <button>Save</button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                    {userSavedList && (
                        <div className="artworkColumnDisplay">
                            {userSavedList.map((artwork) =>
                                <div className="artworkCartCard">
                                    <div className="artworkCardImage">
                                        <Link to={`/ViewItem/${artwork._id}`}>
                                            <img src={artwork.thumbnailURL} />
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
                                            <button>Remove</button>
                                            <button>Edit</button>
                                            <button>Add To Cart</button>
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