import React, { useState, useEffect, useId } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './FollowersFeed.css'
import axios from 'axios'

const FollowersFeed = props => {
  const userId = props.user._id
  const navigate = useNavigate()
  const [userObject, setUserObject] = useState(props.user)
  const [userInfo, setUserInfo] = useState({})
  const [followersList, setFollowersList] = useState([{}])
  const [followingList, setFollowingList] = useState([{}])

  const handleLogOut = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/logout`, {withCredentials: true})
    if (res.data.success === true){
      alert("You have been logged out. Please Log In again to continue.")
      localStorage.removeItem("user")
      props.setuser({})
      navigate("/")
    }
  }

  // console.log(followersList)
  // console.log(followingList)

  useEffect(() => {
    const getProductInfo = async () => {
        if(userObject._id === userId){
            const followers = userObject.followers
            const following = userObject.following
            setFollowersList(followers)
            setFollowingList(following)
            setUserInfo(userObject)
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
  }, [userObject,userInfo])

  return (
    <div className="container LNA_container">
      <div className="LNA_headers">
        <h2 className="LNA_header">
            Followers Feed
        </h2>
        {followersList.length > 0 ? (
          <h4>{followersList.length}</h4>
          ):(
          <h4>You do not have any followers YET!</h4>
          )
        }
      </div>
    </div>
  )
}

export default FollowersFeed