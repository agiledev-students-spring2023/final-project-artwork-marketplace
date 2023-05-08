import React, { useState, useEffect} from 'react'
import './risingartistsub.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const RisingArtistSub = props => {
  const navigate = useNavigate()
  const [artists, setArtists] = useState([])

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
    const getProductInfo = async () => {
      try{
        const getUsers = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/risingArtists`,
          {withCredentials: true}
        )
        const users = getUsers.data
        const usersWithProducts = users.filter(user => user.products_uploaded.length !== 0)
        const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`,
          {withCredentials: true}
        )
        const AllProducts = getProducts.data
        usersWithProducts.forEach(user => {
          user['products'] = AllProducts.filter(product => user.products_uploaded.includes(product._id))
          user.products.length = 1
        })
        setArtists(usersWithProducts)
      } catch (err){
        if(err.response.status === 401){
          handleLogOut()
        }
        else{
          console.log(err)
        }
      } 
    }
    getProductInfo()
  }, [])
  
  return (
    <div className='RA_Parent'>
      <h1 className="RA_heading">Our Top Artist Picks Of The Day</h1>
      {artists && (
        <div className='container RisingArtists_container'>
        {artists.map((artist) => 
          <div className='RA_artistCard' key={artist._id}>
            {artist.products.length && (
              <div className='RA_artistProfileCard'>
                {artist.name && (
                  <div className="RA_artistName">
                    <img src={process.env.REACT_APP_SERVER_HOSTNAME + artist.profilePicture_Path} alt="" />
                    <h2>{artist.name.full}</h2>
                  </div>
                )}
                {artist.products[0] && (
                  <div className="RA_artistDP">
                    <Link to={`/Item/${artist.products[0]._id}`}><img src={process.env.REACT_APP_SERVER_HOSTNAME + artist.products[0].thumbnailURL} alt={artist.products[0].name}/></Link>
                  </div>
                )}
                {artist.products[0] && (
                  <div className="RA_artistProductName">
                    <h3>"{artist.products[0].name}"</h3>
                  </div>
                )}
              </div>
            )}
            <div className="RA_artistActions">
              <Link to={`/Profile/${artist._id}`}>
                <button>Profile</button>
              </Link>              
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  )
}

export default RisingArtistSub