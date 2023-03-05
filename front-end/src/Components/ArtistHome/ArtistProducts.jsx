import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './artistProducts.css'

const ArtistProducts = () => {
  const [username, setUsername] = useState("Bruh") // should be "" when API in use
  // temporary random photos - will be fetched in same format from backend/db
  const products = [
    {
        productName: "product1aiushdiuashdiuashdiaushdiuashdiuashdiashdiusah",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/400/200",
    },
    {
        productName: "product2",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/300/500",
    },
    {
        productName: "product3",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/400",
    },
    {
        productName: "product4",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/500/350",
    },
    {
        productName: "product5",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/700/300",
    },
    {
        productName: "product6",
        productArtist: "Artist Name",
        imageURL: "https://picsum.photos/200/300",
    },
  ]
  

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
                        <Link to='/Home'>{/* Link will need to change to /productPage/:id */}
                            <img src={product.imageURL} alt={product.productName} />
                        </Link>
                        </div>
                        <div className="productInfo">
                            <div className="info">
                                <Link to='/Home'>{/* Link will need to change to /productPage/:id */}
                                    <h5 className="productName">"{product.productName}"</h5>
                                </Link>
                                <h5 className="productArtist">By: <Link to='/Home'>{/* Link will need to change to /artistProfilePage/:id */}{product.productArtist}</Link>
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