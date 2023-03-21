import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'
import AllProducts from '../../SchemaSamples/AllProducts'
import AllUsers from '../../SchemaSamples/AllUsers'

const Cart = props => {
  const [cartSwitch, setCartSwitch] = useState("cart")
  const [userCartList, setUserCartList] = useState([])
  const [userSavedList, setUserSavedList] = useState([])
  
  // should be replaced with API
  useEffect(() => {
    const getCart=()=>{
        const userCart = props.user.cart
        const userSaved = props.user.saved
        const cartList = AllProducts.filter(product => userCart.includes(product._id))
        const savedList = AllProducts.filter(product => userSaved.includes(product._id))
        setUserCartList(cartList)
        setUserSavedList(savedList)
    }
    getCart()
  }, [])

  return (
    <div>
        <div className="container cartHeading__Container">
            {cartSwitch == "cart" &&(
                <h1 className="cartHeading">Your Cart</h1>
            )}
            {cartSwitch == "saved" &&(
                <h1 className="cartHeading">Your Saved List</h1>
            )}
        </div>
        <div className="CartSavedSwitch">
            {cartSwitch == "cart" &&(
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
            {cartSwitch == "saved" &&(
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
            {cartSwitch == "cart" &&(
                <>
                    {userCartList && (
                        <div className="artworkColumnDisplay">
                            {userCartList.map((artwork) =>
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
                                            <button>Save</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {(userCartList.length == 0 || !userCartList) &&(
                        <div className="emptyCart">
                            <h4>Sorry, your cart appears to be empty!</h4>
                        </div>
                    )}
                </>
            )}
            {cartSwitch == "saved" &&(
                <>
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
                    {(userSavedList.length == 0 || !userSavedList) &&(
                        <div className="emptyCart">
                            <h4>Sorry, your saved list appears to be empty!</h4>
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Cart