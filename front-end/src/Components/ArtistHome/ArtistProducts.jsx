import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './artistProducts.css'

const ArtistProducts = props => {
    const [username, setUsername] = useState("")
    const [products, setProducts] = useState([])
    // const [searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
      const getArtistInfo = async () => {
        try{
          const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
          const AllProducts = getProducts.data
          const artist_id = props.user._id
          const artist_name = props.user.name
          const artist_products = AllProducts.filter(product => product.artist_id === artist_id)
          setUsername(artist_name)
          setProducts(artist_products)
        } catch (err){
          console.log(err)
        }
      }
      getArtistInfo()
    }, [])
  
    // const handleSearch = (e) => {
    //   if(e.target.value == ''){
    //       setCategories(randomFakeData)
    //   }
    //   else{
    //       const SearchResult = randomFakeData.filter(item => item.category.toLowerCase().includes(e.target.value.toLowerCase()))
    //       setCategories(SearchResult)
    //   }
    //   setSearchValue(e.target.value)
    // }
  
     
  // temporary random photos - will be fetched in same format from backend/db

  

  /*const apiUrl = "https://my.api.mockaroo.com/user.json?key=8bd34fb0"

  // fake API to get users name
  useEffect(() => {
    const getName = async () => {
      try {
        const response = await axios.get(apiUrl)
        console.log(`success: ${response.status}`) // output the status of the response
        // extract the data from the response
        const data = response.data
        setUsername(data.first_name)
      } catch (err) {
        // what to do if the request/response fails for some reason
        console.log(`failure: ${err}`)
      }
    };
    getName();
  }, []);
  */
  
  return (
    <>
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
    </>
  )
}

export default ArtistProducts