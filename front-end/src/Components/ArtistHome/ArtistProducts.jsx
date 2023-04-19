import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './artistProducts.css'
import { useLocation } from 'react-router-dom';


const ArtistProducts = props => {
    const [username, setUsername] = useState("")
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      const getArtistInfo = async () => {
        try{
          const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`,
            {headers: {Authorization: `JWT ${localStorage.getItem("token")}`}}
          )
          const AllProducts = getProducts.data
          const artist_id = props.user._id
          const artist_name = props.user.name.full
          const artist_products = AllProducts.filter(product => product.artist_id === artist_id)
          setUsername(artist_name)
          setProducts(artist_products)
        } catch (err){
          console.log(err)
        }
      }
      getArtistInfo()
    }, [])

  // console.log(products)
  // const location = useLocation();
  // console.log(location.pathname)

  return (
    <motion.div
      initial={{opacity: 0, y: '100%'}}
      animate={{opacity: 1, y: '0%'}}
      exit={{opacity: 0, y: '-100%'}}
      transition={{duration: 1, delayChildren: 0.5}}
      className='page_artistHomePage' 
    >
      {/* Welcome Message */}
      {username &&(
        <div className='welcomeMsg'>
          <h1>Welcome to Artwork Marketplace, {username}!</h1>
        </div>
      )}
      <div className='container products_container'>   
        {products.length !== 0 &&(
          <div className="sectionHeading">
            <h2 className="labell">Your Artworks</h2>
          </div>
        )}
        {products.length === 0 &&(
          <div className="sectionHeading">
            <h2 className="labell">Please Add An Artwork To Get Started As An Artist!</h2>
          </div>
        )}
        {products.length !== 0 &&(
          <div className='productColumn'>
              {products.map((product)=>
                <div className='productCard'>
                  <div className="productImage">
                  <Link to={`/Item/${product._id}`}>
                    <img src={product.thumbnailURL} alt={product.name} />
                  </Link>
                  </div>
                  <div className="productInfo">
                    <div className="info">
                      <Link to={`/Item/${product._id}`}>
                        <h5 className="productName">"{product.name}"</h5>
                      </Link>
                      <h5 className="productArtist">By: <Link to={`/Profile/${props.user._id}`}>{username}</Link></h5>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ArtistProducts