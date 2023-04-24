import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import './productDisplay.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const ProductDisplay = props => {
  const getCategoryID = useParams()
  const [categoryy, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

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
    const findCategory = async () => {
      try{
        const ID = getCategoryID.categoryID
        const getCategory = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories/category/${ID}`,
          {withCredentials: true}
        )
        const foundCategory = getCategory.data
        const productsOfCategory = foundCategory.products_id
        setCategory(foundCategory)
        setProducts(productsOfCategory)
      } catch (err) {
        if(err.response.status === 401){
          handleLogOut()
        }
        else{
          console.log(err)
        }
      }
    }
    findCategory()
  }, [])


  // for responsive styling
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    600: 1
  };

  const handleSearch = (e) => {
    if(e.target.value == ''){
        setProducts(categoryy[0].products)
    }
    else{
        const SearchResult = products.filter(item => item.productName.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(SearchResult)
    }
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <div className="container searchArtwork__Container">
        <Link to="/" className='categoryBack_button categoryBack_button-Primary'>Back</Link>
        <input className='searchArtworkTextField' placeholder='Search Artworks' value={searchValue} onInput={(e) => handleSearch(e)}/>
      </div>
      <div className="container displayArtworks__Container">
        {categoryy && (
          <div className="">
            <div className="categoryComponent">
              <h1 className='catTitle'>{categoryy.name} Artworks</h1>
              {products && (
                <Masonry 
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {products.map((product) =>
                    <div className='cat_artworkCard' key={product._id}>
                      <div className="cat_artworkPhoto">
                        <Link to={`/Item/${product._id}`} >
                          <img className='artworkImagee' src={process.env.REACT_APP_SERVER_HOSTNAME + product.thumbnailURL} alt={product.name} />
                        </Link>
                      </div>
                      <Link to={`/Item/${product._id}`} >
                        <div className="cat_artworkInfo">
                          <h5>"{product.name}"</h5>
                        </div>    
                      </Link>                  
                    </div>
                  )}
                </Masonry>
              )}
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay