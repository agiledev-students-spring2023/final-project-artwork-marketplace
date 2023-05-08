import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'
import { IoClose, IoReturnUpBack } from 'react-icons/io5'
import { GiConfirmed } from 'react-icons/gi'
import './profileSub.css'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { format } from 'timeago.js'
import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'

const ProfileSub = props => {
    const getUserParamsID = useParams()
    const userId = getUserParamsID.userID
    const navigate = useNavigate()
    const [userObject, setUserObject] = useState(props.user)
    const [userInfo, setUserInfo] = useState({})
    const [userUploadedProducts, setUserUploadedProducts] = useState([])
    const [followersList, setFollowersList] = useState([{}])
    const [followingList, setFollowingList] = useState([{}])
    const [displayPicture, setDisplayPicture] = useState("")
    const [formDisplayPicture, setFormDisplayPicture] = useState({})
    const [changeProfilePic, setChangeProfilePic] = useState(false)
    const [viewFType, setViewFType] = useState("")
    const [viewFList, setViewFList] = useState([])

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
            if(userObject._id === userId){
                const followers = userObject.followers
                const following = userObject.following
                const DPPath = process.env.REACT_APP_SERVER_HOSTNAME + userObject.profilePicture_Path
                setDisplayPicture(DPPath)
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
                    // this.forceUpdate()
                } catch (err){
                    if(err.response.status === 401){
                        handleLogOut()
                    }
                    else{
                        console.log(err)
                    }
                } 
            }          
        }
        getProductInfo()
    }, [userId])

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
        if (checkFollow()){
            // unfollow
            try {
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
                    setUserInfo({...userInfo, followers: userInfo.followers.filter(user => user._id !== userObject._id)})
                    setFollowersList(followersList.filter(user => user._id !== userObject._id))
                }
            } catch (err) {
                if(err.response.status === 401){
                    handleLogOut()
                }
                else{
                    console.log(err)
                }
            }
        }
        else{
            try {
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
                    setUserInfo({...userInfo, followers: [...userInfo.followers, userObject]})
                    setFollowersList([...followersList, userObject])
                }
            } catch (err) {
                if(err.response.status === 401){
                    handleLogOut()
                }
                else{
                    console.log(err)
                }
            }
        }
    }

    const handleFilesChange = e => {
        const image = e.target.files[0]
        setDisplayPicture(URL.createObjectURL(image))
        setFormDisplayPicture(image)
        setChangeProfilePic(true)
    }

    const handlePhotoSubmit = async e => {
        e.preventDefault()
        const formData = new FormData() 
        formData.append('user_profilePicture', formDisplayPicture)
        try{
            await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userId}/changeProfilePicture`,
                formData, 
                {withCredentials: true}
            )
            .then(res => {
                const userObject = JSON.parse(localStorage.getItem("user"))
                userObject.profilePicture_Path = res.data
                localStorage.setItem("user", JSON.stringify(userObject))
                props.setuser({...props.user, profilePicture_Path: res.data})
                setUserObject({...userObject, profilePicture_Path: res.data})
                setUserInfo({...userInfo, profilePicture_Path: res.data})
            })
        } catch (err){
            // if invalid token
            if(err.response.status === 401){
                handleLogOut()
            }
            else{
                console.log(err)
            }
        }
        console.log("submit initiated")
        setFormDisplayPicture({})
        setDisplayPicture("")
        setChangeProfilePic(false)
    }

    const handleCloseChangeDP = e => {
        setFormDisplayPicture({})
        setDisplayPicture("")
        setChangeProfilePic(false)
    }

    const handleFollowingClick = () => {
        setViewFType("Following")
        setViewFList(followingList)
    }

    const handleFollowersClick = () => {
        setViewFType("Followers")
        setViewFList(followersList)
    }

    const handleCloseViewF = () => {
        setViewFType("")
        setViewFList([])
    }

    return(
        <div className="container profile_container">
            {userInfo && userInfo.name && viewFType === "" && (
                <>
                    <div className='profile_information'>
                        <h2 className='profile_title'>{userInfo.name.full}'s Artist Profile</h2>
                        <div className="profile_picAndActions">
                            <div className="profile_picAndChangePic">
                                {userObject._id === userId && (
                                    <form onSubmit={handlePhotoSubmit}>
                                        <label htmlFor='profile_FileUpload'>
                                            <input 
                                                className='filesUploadField'
                                                type='file'
                                                id='profile_FileUpload'
                                                accept='.png, .jpg, .jpeg .webp'
                                                onChange={handleFilesChange}
                                                hidden
                                            />
                                            <FiEdit2 className='filesUploadIcon'/>
                                        </label>
                                    </form>
                                )}
                                {changeProfilePic === true && (
                                    <>
                                        <button className='profile_closeChangePic' type='button' onClick={handleCloseChangeDP}><IoClose/></button>
                                        <button className='profile_submitChangePic' onClick={handlePhotoSubmit}><GiConfirmed/></button>
                                    </>
                                )}
                                <div className='profile_pic'>
                                    <img src={changeProfilePic === true ? (displayPicture !== "" && (displayPicture)) : process.env.REACT_APP_SERVER_HOSTNAME + userInfo.profilePicture_Path} alt={userInfo.name.full}/>
                                </div>
                            </div>
                            <h5 className="profile_userSince">User since {format(userInfo.createdAt)}</h5>
                            {userObject._id !== userId && (
                                <button className={`follow_button ${checkFollow() ? "followed" : "follow"}`} onClick={handleFollow}>Follow</button>
                            )}
                            <div className='profile_ff'>
                                <div className="profile_followers">
                                <h5>{followersList.length}</h5>
                                    <button onClick={() => handleFollowersClick()}>Followers</button>  
                                </div>
                                <div className="profile_following">
                                    <h5>{followingList.length}</h5>
                                    <button onClick={() => handleFollowingClick()}>Following</button>  
                                </div>             
                            </div>
                        </div>
                        <div className='profile_contact'>
                            <h4>Contact Artist: </h4>
                            <div className='user_email'><Link to={`mailto:${userInfo.email}`}>{userInfo.email}</Link></div>
                        </div>
                    </div>
                    {userUploadedProducts && (
                        <motion.div
                            initial={{opacity: 0, y: '100%'}}
                            animate={{opacity: 1, y: '0%'}}
                            exit={{opacity: 0, y: '-100%'}}
                            transition={{delay: 0.5, duration: 1}}
                        >
                        {userUploadedProducts.length > 0 && (
                          <>
                            <h2 className='profile_uploadedProducts_title'>Uploaded Artworks</h2>
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
                                            <h4 className={`product_price ${product.status.toLowerCase() === "sold" ? "sold" : "available"}` }>
                                                ${" " + product.price}
                                            </h4>
                                        </Link>
                                    </div>
                                </div>
                                )}
                            </Masonry>
                          </>
                        )}
                        {userUploadedProducts.length === 0 && (
                            <div className='profile_emptyProducts'>{userInfo.name.full} Has Not Published Any Artworks Yet!</div>
                        )}
                        </motion.div>
                    )}
                </>
            )}
            {userInfo && userInfo.name && viewFType !== "" && (
                <div className="profile_viewF">
                    <button className="profile_closeviewFButton" type='button' onClick={handleCloseViewF}>
                        <IoReturnUpBack/>
                    </button>
                    <div className="profile_viewF_header">
                        <h2>{userInfo.name.first}'s {viewFType}</h2>
                    </div>
                    <div className="profile_viewF_list">
                        {viewFList && viewFList.length > 0 && viewFList.map((user) =>
                            <Link to={`/Profile/${user._id}`}>
                                <div className="profile_viewF_user" key={user._id}>
                                    <div className="profile_viewF_user_pic">
                                        <img src={process.env.REACT_APP_SERVER_HOSTNAME + user.profilePicture_Path} alt={user.name.full}/>
                                    </div>
                                    <div className="profile_viewF_user_name">
                                        {user.name.full}
                                    </div>
                                </div>
                            </Link>
                        )}
                        {viewFList && viewFList.length === 0 && (
                            <div className="profile_viewF_empty">No {viewFType} Yet!</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileSub