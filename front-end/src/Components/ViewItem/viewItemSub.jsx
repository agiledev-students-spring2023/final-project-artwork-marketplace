import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './viewItemSub.css'
import axios from 'axios'


const ViewItemSub = props => {
  const getProductParamsID = useParams()
  
  const [product, setProduct] = useState({})
  const [productName, setProductName] = useState("")
  const [productArtist, setProductArtist] = useState({})
  const [productImages, setProductImages] = useState([])
  const [productStatus, setProductStatus] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCategories, setProductCategories] = useState([])
  const [productDescription, setProductDescription] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showMore, setShowMore] = useState(false);  
  
  useEffect(() => {
    const getProductInfo = async () => {
      try{
        const productId = getProductParamsID.productID
        const getProduct = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks/${productId}`)
        const thisProduct = getProduct.data
        const thisProductName = thisProduct.name
        const getProductArtist = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${thisProduct.artist_id}`) 
        const thisProductArtist = getProductArtist.data
        const thisProductImages = thisProduct.imagesURL
        const thisProductStatus = thisProduct.status // "sold" or "available"
        const thisProductPrice = thisProduct.price
        const getAllCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`)
        const AllCategories = getAllCategories.data
        const thisProductCategories = AllCategories.filter(category => thisProduct.categories_id.includes(category._id))
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
        console.log(err)
      } 
    }
    getProductInfo()
  }, [])
  
  const addItemToCart = async (id) => {
    const userId = props.user._id 
    const newCart = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${userId}/cart/${id}`)
  }

  const handleSmallPhotoClick = (index) => {
    setActiveImageIndex(index)
  }

  const handleMoreClick = () => {
    setShowMore(!showMore);
  }

  return(
    <div className="container viewItemContainer">
      <div className="viewItem_card">
        <div className="viewItem_big-img">
          <img src={productImages[activeImageIndex]} alt=""/>
        </div>
        <div className="viewItem_box">
          <h2 className='viewItem_productName'>"{productName}"</h2>
          <div className="viewItem_row">
            {productStatus && productStatus === "available" && (
              <span className='viewItem_price available'>${productPrice}</span>
            )}
            {productStatus && productStatus === "sold" && (
              <>
                <span className='viewItem_price sold price'>${productPrice}</span><br/>
                <span className='viewItem_price sold'>SOLD</span>
              </>
            )}
          </div>
          {productArtist.name && (
            <p className='viewItem_Artist'>
              Artwork By:  {" "}  
              <Link to={`/Profile/${productArtist._id}`}>
                {productArtist.name.full}
              </Link>
            </p>
          )}
          <div className="viewItem_prodCategories">
            <p>Categories: </p>
            {productCategories.map((category) => 
              <h5>
              <Link to={`/Category/${category._id}`}>
                {category.name}
              </Link>
              </h5>
            )}
          </div>
          <div className='viewItem_thumb'>
            {productImages.map((thispic,index) => 
              <img src={thispic} onClick={() => handleSmallPhotoClick(index)}/>
            )}
          </div>
          <button className="viewItem_button" onClick={handleMoreClick}>
            {showMore ? 'Hide' : 'Show'} details
          </button>
          {showMore && 
            <p className="viewItem_detailedDescription">{productDescription}</p>
          }
          {props.user.user === "Customer" && productStatus !== "sold" &&(
            <button className="viewItem_button" onClick={() => addItemToCart(product._id)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewItemSub