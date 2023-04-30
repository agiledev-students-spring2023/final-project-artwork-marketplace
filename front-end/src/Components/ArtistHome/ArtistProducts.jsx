import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './artistProducts.css'
import { useLocation, useNavigate } from 'react-router-dom';


const ArtistProducts = props => {
  const [username, setUsername] = useState("")
  const [products, setProducts] = useState([])
  const [copyOfProducts, setProductsCopy] = useState([])
  const [searchValue, setSearchValue] = useState('')
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
    const getArtistInfo = async () => {
      try{
        const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`,
          {withCredentials: true}
        )
        const AllProducts = getProducts.data
        const artist_id = props.user._id
        const artist_name = props.user.name.full
        const artist_products = AllProducts.filter(product => product.artist_id === artist_id)
        setUsername(artist_name)
        setProducts(artist_products)
        setProductsCopy(artist_products)
      } catch (err){
        // if invalid token
        if(err.response.status === 401){
          handleLogOut()
        }
        else{
          console.log(err)
        }
      }
    }
    getArtistInfo()
  }, [])

  const handleSearch = (e) => {
    if(e.target.value == '' && products && copyOfProducts){
      setProducts(copyOfProducts)
    }
    else{
      const SearchResult = products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setProducts(SearchResult)
    }
    setSearchValue(e.target.value)
  }

  return (
    <motion.div
      initial={{opacity: 0, y: '100%'}}
      animate={{opacity: 1, y: '0%'}}
      exit={{opacity: 0, y: '-100%'}}
      transition={{duration: 1, delay: 0.5}}
      className='page_artistHomePage' 
    >
      <div className="searchBar_bg">
        <div className='container searchBar__container'>
          <input className='searchBarTextField' placeholder='Search Your Artworks' value={searchValue} onInput={(e) => handleSearch(e)}/> 
        </div>
      </div>
      {/* Welcome Message */}
      {username &&(
        <div className="PerformanceMSG">
          <Link to="/Analytics">
            <div className='PerformanceBanner'>
              <h1>Check Out Your Performance As An Artist!</h1>
            </div>
          </Link>
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
                <div className='productCard' key={product._id}>
                  <div className="productImage">
                  <Link to={`/Item/${product._id}`}>
                    <img src={process.env.REACT_APP_SERVER_HOSTNAME + product.thumbnailURL} alt={product.name} />
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