import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AllProducts from '../../SchemaSamples/AllProducts'
import AllUsers from '../../SchemaSamples/AllUsers'
import './artistProducts.css'

const ArtistProducts = props => {
    const [username, setUsername] = useState("")
    const [products, setProducts] = useState([])
    // const [searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
      const getArtistInfo=()=>{
        const artist_id = props.user._id
        const artist_name = props.user.name
        const artist_products = AllProducts.filter(product => product.artist_id === artist_id)
        setUsername(artist_name)
        setProducts(artist_products)
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
    <div className='container products_container'>
        {/* Welcome Message */}
        {username &&(
            <div>
                <div className='welcomeMsg'>
                    <h1>Welcome to Artwork Marketplace, {username}!</h1>
                </div>
                <div className="sectionHeading">
                    <h2 className="labell">Artworks by {username}</h2>
                </div>
            </div>
        )}
        {products &&(
            <div className='productColumn'>
                {products.map((product)=>
                    <div className='productCard'>
                        <div className="productImage">
                        <Link to='/'>{/* Link will need to change to /productPage/:id */}
                            <img src={product.thumbnailURL} alt={product.name} />
                        </Link>
                        </div>
                        <div className="productInfo">
                            <div className="info">
                                <Link to='/'>{/* Link will need to change to /productPage/:id */}
                                    <h5 className="productName">"{product.name}"</h5>
                                </Link>
                                <h5 className="productArtist">By: <Link to='/'>{/* Link will need to change to /artistProfilePage/:id */}{username}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default ArtistProducts