import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { motion } from 'framer-motion'

const ViewFollowing = props => {
    const navigate = useNavigate()
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

    useEffect(() => {
    const getProductInfo = () => {
        const following = props.user.following
        setFollowingList(following)
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

        <div>{followingList && (
            <div>{followingList.map((user) => 
                <Link to={`/Profile/${user._id}`}>
                <div>
                    {user.name&&(<div>{user.name.full}</div>)}
                    <div><img src={process.env.REACT_APP_SERVER_HOSTNAME+user.profilePicture_Path} alt="profile pic"/></div>
                </div>
                </Link>
                )
                }</div>
        )}</div>
        
        </motion.div>
    );
};
export default ViewFollowing;