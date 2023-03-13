import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import './productDisplay.css'
import randomFakeData from '../CustomerHomePage/randomFakeData'

const ProductDisplay = () => {
  const getCategoryID = useParams()
  const [categoryy, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    const findCategory=()=>{
      const ID = getCategoryID.categoryID
      const foundCategory = randomFakeData.filter(item => item.id == ID)
      setCategory(foundCategory)
      const productsFound = foundCategory[0].products
      setProducts(productsFound)
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
        <Link to="/CustomerHome" className='categoryBack_button categoryBack_button-Primary'>Back</Link>
        <input className='searchArtworkTextField' placeholder='Search Artwork' value={searchValue} onInput={(e) => handleSearch(e)}/>
      </div>
      <div className="container displayArtworks__Container">
        {categoryy && (
          <div className="">
            {categoryy.map((cat) => 
            <div className="categoryComponent">
              <h1 className='catTitle'>{cat.category} Artworks</h1>
              {products && (
                <Masonry 
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {products.map((product) =>
                    <div className='artworkCard'>
                      <Link to={`/ViewItem/${product.id}`}>
                        <img className='artworkImagee' src={product.imageURL} alt="" />
                      </Link>
                    </div>
                  )}
                </Masonry>
              )}
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay