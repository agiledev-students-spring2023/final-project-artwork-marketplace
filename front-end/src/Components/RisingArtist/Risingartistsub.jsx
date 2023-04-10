import React, { useState, useEffect} from 'react'
import './risingartistsub.css'
import axios from "axios"
import { Link } from 'react-router-dom'

const RisingArtistSub = props => {
  
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const getProductInfo = async () => {
      try{
        const getUsers = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/risingArtists`)
        const users = getUsers.data
        const usersWithProducts = users.filter(user => user.products_uploaded.length !== 0)
        const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
        const AllProducts = getProducts.data
        usersWithProducts.forEach(user => {user['products'] = AllProducts.filter(product => user.products_uploaded.includes(product._id))})
        usersWithProducts.forEach(user => user.products.length = 1)
        setArtists(usersWithProducts)
      } catch (err){
        console.log(err)
      } 
    }
    getProductInfo()
  }, [])

  const handleFollow = (userID, followsID) => {

  }
  
  return (
    <div className='container RisingArtists_container'>
      {artists && (
        <>
        {artists.map((artist) => 
          <div className='RA_artistCard'>
            {artist.products && (
              <div className='RA_artistProfileCard'>
                {artist.name && (
                  <div className="RA_artistName">
                    <h2>{artist.name.full}</h2>
                  </div>
                )}
                <div className="RA_artistDP">
                  <Link to={`/Item/${artist.products[0]._id}`}><img src={artist.products[0].thumbnailURL} alt={artist.products[0].name}/></Link>
                </div>
                <div className="RA_artistProductName">
                  <h3>"{artist.products[0].name}"</h3>
                </div>
              </div>
            )}
            <div className="RA_artistActions">
              <Link to={`/Profile/${artist._id}`}>
                <button>Profile</button>
              </Link>
              {props.user._id !== artist._id && (
                <>
                  <button className={props.user.following.includes(artist._id) ? "followed" : "follow"} onClick={() => handleFollow(props.user._id, artist._id)}>Follow</button>
                </>
              )}
              
            </div>
          </div>
        )}
        </>
      )}
    </div>
  )
}

export default RisingArtistSub