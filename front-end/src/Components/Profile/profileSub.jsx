import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './profileSub.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'

const ProfileSub = props => {
    const getUserParamsID = useParams()
    const userId = getUserParamsID.userID
    const [userObject, setUserObject] = useState(props.user)

    const [userInfo, setUserInfo] = useState({})
    const [userUploadedProducts, setUserUploadedProducts] = useState([])
    const [followersList, setFollowersList] = useState([{}])
    const [followingList, setFollowingList] = useState([{}])

    useEffect(() => {
        const getProductInfo = async () => {
            if(userObject._id === userId){
                const followers = userObject.followers
                const following = userObject.following
                setFollowersList(followers)
                setFollowingList(following)
                setUserInfo(userObject)
                setUserUploadedProducts(userObject.products_uploaded)
            }
            else{
                try{
                    const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userId}`, 
                        {withCredentials: true}
                    )
                    const user = getUser.data
                    const products = user.products_uploaded
                    const followers = user.followers
                    const following = user.following
                    setFollowersList(followers)
                    setFollowingList(following)
                    setUserInfo(user)
                    setUserUploadedProducts(products)
                } catch (err){
                    console.log(err)
                } 
            }          
        }
        getProductInfo()
    }, [userObject])

    // for responsive styling
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        600: 1
    };
    const checkFollow = () => {
        if(userObject.following.filter(user => user._id === userInfo._id ).length > 0){
            return true
        }
        else{
            return false
        }
    }
    const handleFollow = async () => {
        console.log(checkFollow())
        if (checkFollow()){
            const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${userObject._id}/unfollow/${userId}`, 
                {},
                {withCredentials: true, credentials: 'include'}
            )
            if(res.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                const updatedFollowing = res.data
                userObject.following = updatedFollowing
                localStorage.setItem("user", JSON.stringify(userObject))
                props.setuser({...props.user, following: updatedFollowing})
                setUserObject({...userObject, following: updatedFollowing})
            }
        }
        else{
            const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${userObject._id}/follow/${userId}`, 
                {},
                {withCredentials: true, credentials: 'include'}
            )
            if(res.status === 200){
                const userObject = JSON.parse(localStorage.getItem("user"))
                const updatedFollowing = res.data
                userObject.following = updatedFollowing
                localStorage.setItem("user", JSON.stringify(userObject))
                props.setuser({...props.user, following: updatedFollowing})
                setUserObject({...userObject, following: updatedFollowing})
            }
        }
    }

    return(
        <div className="container profile_container">
            {userInfo && userInfo.name && (
                <>
                    <div className='profile_information'>
                        <h2 className='profile_title'>{userInfo.name.full}'s Artist Profile</h2>
                        <div className="profile_picAndActions">
                            <div className='profile_pic'>
                                <img src={process.env.REACT_APP_SERVER_HOSTNAME + userInfo.profilePicture_Path} alt={userInfo.name.full}/>
                            </div>
                            {userObject._id !== userId && (
                                <button className={`follow_button ${checkFollow() ? "followed" : "follow"}`} onClick={handleFollow}>Follow</button>
                            )}
                            <div className='profile_ff'>
                                <div className="profile_followers">
                                    <h5>{followersList.length}</h5>
                                    <button>Followers</button>
                                </div>
                                <div className="profile_following">
                                    <h5>{followingList.length}</h5>
                                    <button>Following</button>  
                                </div>
                                                          
                            </div>
                        </div>
                        <div className='profile_contact'>
                            <h4>Contact Artist: </h4>
                            <div className='user_email'><Link to={`mailto:${userInfo.email}`}>{userInfo.email}</Link></div>
                        </div>
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
                                        <img src={process.env.REACT_APP_SERVER_HOSTNAME + product.thumbnailURL} alt={product.name}/>
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
                            <div className='profile_emptyProducts'>{userInfo.name.full} Has Not Published Any Artworks Yet!</div>
                        )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ProfileSub