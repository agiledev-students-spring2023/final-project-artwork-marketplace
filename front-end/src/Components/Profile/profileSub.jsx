import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './profileSub.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'

const ProfileSub = props => {
    const getUserParamsID = useParams()
    const userId = getUserParamsID.userID

    const [userInfo, setUserInfo] = useState({})
    const [userUploadedProducts, setUserUploadedProducts] = useState([])

    useEffect(() => {
        const getProductInfo = async () => {
          try{
            const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userId}`)
            const user = getUser.data
            const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
            const AllProducts = getProducts.data
            const userProducts = AllProducts.filter(product => product.artist_id === user._id)
            setUserInfo(user)
            setUserUploadedProducts(userProducts)
          } catch (err){
            console.log(err)
          } 
        }
        getProductInfo()
    }, [])

    // for responsive styling
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        600: 1
    };

    return(
        <div className="container profile_container">
            {userInfo && userInfo.name && (
                <>
                    {userInfo._id === props.user._id && (
                        <h2 className='profile_title'>My Artist Profile</h2>
                    )}
                    {userInfo._id !== props.user._id && (
                        <h2 className='profile_title'>{userInfo.name.full}'s Artist Profile</h2>
                    )}    
                    <div className='profile_contact'>
                       <h4>Contact Artist: </h4>
                       <div className='user_email'><Link to={`mailto:${userInfo.email}`}>{userInfo.email}</Link></div>
                    </div>
                    {userUploadedProducts && (
                        <>
                        {userUploadedProducts.length > 0 && (
                          <Masonry 
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                          >
                            {userUploadedProducts.map((product) => 
                              <div className="profile_product_card" key={product._id}>
                                <div className="product_photo">
                                    <Link to={`/Item/${product._id}`}>
                                        <img src={product.thumbnailURL} alt={product.name}/>
                                    </Link>
                                </div>
                                <div className="product_info">
                                    <Link to={`/Item/${product._id}`}>
                                        <h3 className="product_name">
                                            "{product.name}"
                                        </h3>
                                        <h4 className={`product_price ${product.status === "sold" ? "sold" : "available"}` }>
                                            ${" " + product.price}
                                        </h4>
                                    </Link>
                                </div>
                              </div>
                            )}
                          </Masonry>
                        )}
                        {userUploadedProducts.length === 0 && (
                            <div>{userInfo.name.full} Has Not Published Any Artworks Yet!</div>
                        )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ProfileSub

