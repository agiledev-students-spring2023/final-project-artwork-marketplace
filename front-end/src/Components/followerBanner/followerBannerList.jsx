import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './followerBanner.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { motion } from 'framer-motion'

const ViewFollowers = props => {
    const navigate = useNavigate()
    const [followersList, setFollowersList] = useState([{}])
    
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
    const getProductInfo = () => {
        const followers = props.user.followers
        setFollowersList(followers)
    }
    getProductInfo()
},[])

    return (
        <motion.div className="container viewItemContainer"
        initial={{opacity: 0, y: '100%'}}
        animate={{opacity: 1, y: '0%'}}
        exit={{opacity: 0, y: '-100%'}}
        transition={{delay: 0.5, duration: 1}}
        >

        <div>{followersList && (
            <div>{followersList.map((user) => 
                <div className='followersStyle'>
                <Link to={`/Profile/${user._id}`}>
                    {user.name&&(<div className='fwrText'>{user.name.full}</div>)}
                    <div><img src={process.env.REACT_APP_SERVER_HOSTNAME+user.profilePicture_Path} alt="profile pic"/></div>
                </Link>
                </div>
                )
                }</div>
        )}</div>
        
        </motion.div>
    );
};
export default ViewFollowers;