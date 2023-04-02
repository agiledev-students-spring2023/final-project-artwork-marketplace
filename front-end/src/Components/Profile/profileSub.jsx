import React, {useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './profileSub.css'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

const ProfileSub = props => {
    const getUserParamsID = useParams()
    const userId = getUserParamsID.userID

    const [userInfo, setUserInfo] = useState({})
    const [userUploadedProducts, setUserUploadedProducts] = useState([])

    useEffect(() => {
        const getProductInfo = async () => {
          try{
            const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${userId}`)
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

    return(
        <div className='profilebodyset'>
            {userInfo && userInfo.name && (
                <>
                    {userInfo._id == props.user._id && (
                        <h3 className='profileplace'>MY ARTIST PROFILE</h3>
                    )}
                    {userInfo._id != props.user._id && (
                        <h3 className='profileplace'>{userInfo.name.full}'S ARTIST PROFILE</h3>
                    )}    
                    <h3>
                        Contact Artist: {userInfo.email}
                    </h3>
                    {userUploadedProducts && (
                        <>
                        {userUploadedProducts.length > 0 && (
                            <ImageList sx={{ width: 500, margin: 'auto' }}>
                                <ImageListItem key="Subheader" cols={2}>
                                    <ListSubheader component="div">{userInfo.name.full}'s Artworks</ListSubheader>
                                </ImageListItem>
                                {userUploadedProducts.map((product) => (
                                        <ImageListItem key={product._id}>
                                        <img
                                            src={`${product.thumbnailURL}?w=248&fit=crop&auto=format`}
                                            srcSet={`${product.thumbnailURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                        <Link to={`/Item/${product._id}`}>
                                        <ImageListItemBar
                                            title={product.name}
                                            subtitle={`$${product.price}`}
                                        />
                                        </Link>
                                        </ImageListItem>
                                ))}
                            </ImageList>
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

