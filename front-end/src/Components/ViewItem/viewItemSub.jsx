import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './viewItemSub.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { motion } from 'framer-motion'


const ViewItemSub = props => {
  const getProductParamsID = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [productName, setProductName] = useState("")
  const [productArtist, setProductArtist] = useState({})
  const [productImages, setProductImages] = useState([])
  const [productStatus, setProductStatus] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCategories, setProductCategories] = useState([])
  const [productDescription, setProductDescription] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
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
        const productId = getProductParamsID.productID
        const getProduct = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks/${productId}`,
          {withCredentials: true}
        )
        const thisProduct = getProduct.data[0]
        const thisProductName = thisProduct.name
        const getProductArtist = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${thisProduct.artist_id}`,
          {withCredentials: true}
        ) 
        const thisProductArtist = getProductArtist.data
        const thisProductImages = thisProduct.imagesURL
        const thisProductStatus = thisProduct.status 
        const thisProductPrice = thisProduct.price
        const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories/product/${productId}`,
          {withCredentials: true}
        )
        const thisProductCategories = getCategories.data
        const thisProductDescription = thisProduct.shortDescription
        setProduct(thisProduct)
        setProductName(thisProductName)
        setProductArtist(thisProductArtist)
        setProductImages(thisProductImages)
        setProductStatus(thisProductStatus)
        setProductPrice(thisProductPrice)
        setProductCategories(thisProductCategories)
        setProductDescription(thisProductDescription)
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
  
  const addItemToCart = async (id) => {
    try {
      const userId = props.user._id 
      const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userId}/addToCart/${id}`,
        {},
        {withCredentials: true}
      )
      if(res.status === 200){
        const userObject = JSON.parse(localStorage.getItem("user"))
        userObject.cart = res.data
        localStorage.setItem("user", JSON.stringify(userObject))
        props.setuser({...props.user, cart: res.data})
        navigate("/Cart")
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

  const addItemToSaved = async (id) => {
    try {
      const userId = props.user._id 
      const res = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userId}/addToSaved/${id}`,
        {},
        {withCredentials: true}
      )
      if(res.status === 200){
        const userObject = JSON.parse(localStorage.getItem("user"))
        userObject.saved = res.data
        localStorage.setItem("user", JSON.stringify(userObject))
        props.setuser({...props.user, saved: res.data})
        navigate("/Cart")
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

  const handleSmallPhotoClick = (index) => {
    setActiveImageIndex(index)
  }

  return(
    <motion.div className="container viewItemContainer"
      initial={{opacity: 0, y: '100%'}}
      animate={{opacity: 1, y: '0%'}}
      exit={{opacity: 0, y: '-100%'}}
      transition={{delay: 0.5, duration: 1}}
    >
      <div className="viewItem_card">
        <motion.div className="viewItem_big-img">
          <img src={process.env.REACT_APP_SERVER_HOSTNAME + productImages[activeImageIndex]} alt=""/>
        </motion.div>
        <div className="viewItem_box">

          <h2 className='viewItem_productName'>"{productName}"</h2>

          <div className="viewItem_row">
            <p>Price & Status: </p>
            {productStatus && productStatus.toLowerCase() === "available" && (
              <>
                <span className='viewItem_price available'>${productPrice}</span><br/>
                <span className='viewItem_price available'>AVAILABLE</span>
              </>
            )}
            {productStatus && productStatus.toLowerCase() === "sold" && (
              <>
                <span className='viewItem_price sold price'>${productPrice}</span><br/>
                <span className='viewItem_price sold'>SOLD {format(product.updatedAt)}</span>
              </>
            )}
          </div>

          <div className='viewItem_Artist'>
            <p>Artwork By: </p>
            <h5>
              <Link to={`/Profile/${productArtist._id}`}>
                <img src={process.env.REACT_APP_SERVER_HOSTNAME + productArtist.profilePicture_Path} alt={productArtist.profilePicture_Path} />
                {productArtist.name && (
                  productArtist.name.full
                )}
              </Link>
            </h5>
          </div>
          
          <div className="viewItem_prodCategories">
            <p>Categories: </p>
            <div className='viewItem_categoriesss'>
              {productCategories.map((category) => 
                <h5 key={category._id}>
                  <Link to={`/Category/${category._id}`}>
                    {category.name}
                  </Link>
                </h5>
              )}
            </div>
          </div>
          <div className="viewItem_prodDescription">
            <p>Description: </p>
            <h5 className="viewItem_detailedDescription">{productDescription}</h5>
          </div>
          <div className='viewItem_inactiveThumb'>
            <p>Images: </p>
            <div className='viewItem_thumb'>
              {productImages.map((thispic,index) => 
                <img className={index === activeImageIndex ? "active" : ""} src={process.env.REACT_APP_SERVER_HOSTNAME + thispic} onClick={() => handleSmallPhotoClick(index)} key={index} alt={`${index}`}/>
              )}
            </div>
          </div>
          <h5 className="viewItem_postedTimeAgo">Posted {format(product.createdAt)}</h5>
          {props.user.user === "customer" && props.user._id !== productArtist._id &&(
            <button className="viewItem_button save" onClick={() => addItemToSaved(product._id)}>
              Save
            </button>
          )}
          {props.user.user === "customer" && productStatus.toLowerCase() !== "sold" && props.user._id !== productArtist._id &&(
            <button className="viewItem_button cart" onClick={() => addItemToCart(product._id)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ViewItemSub