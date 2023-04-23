import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './categoryDisplay.css'
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"


const CategoryDisplay = props => {
  const [categories, setCategories] = useState([])
  const [copyOfCategories, setCategoriesCopy] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [widths, setWidths] = useState([]);
  const widthRef = useRef()

  useEffect(() => {
    const allCarousels = widthRef.current.querySelectorAll('.carousel')
    const widthsSet = []
    allCarousels.forEach((carousel, index) => widthsSet[index] = carousel.scrollWidth - carousel.offsetWidth + 15)
    setWidths(widthsSet)
  }, [categories])
  
  useEffect(() => {
    const getCategories = async ()=>{
        try{
            const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`,
                {withCredentials: true}
            )
            const categoriesCopy = getCategories.data
            const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`,
                {withCredentials: true}
            )
            const AllProducts = getProducts.data
            // console.log(AllProducts)
            categoriesCopy.forEach(category => {category['products'] =  AllProducts.filter(product => category.products_id.includes(product._id))})
            // console.log(categoriesCopy)
            setCategories(categoriesCopy)
            setCategoriesCopy(categoriesCopy)
        }
        catch (err){
            console.log(err)
        }
    }
    getCategories()
  }, [])
//   console.log(categories)

  const handleSearch = (e) => {
    if(e.target.value == '' && categories && copyOfCategories){
        setCategories(copyOfCategories)
    }
    else{
        const SearchResult = categories.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setCategories(SearchResult)
    }
    setSearchValue(e.target.value)
  }
  
  return (
    <motion.div
        initial={{opacity: 0, y: '100%'}}
        animate={{opacity: 1, y: '0%'}}
        exit={{opacity: 0, y: '-100%'}}
        transition={{duration: 1}}
        className='page_customerHomePage'   
    >
        <div className="searchBar_bg">
            <div className='container searchBar__container'>
                <input className='searchBarTextField' placeholder='Search Categories' value={searchValue} onInput={(e) => handleSearch(e)}/> 
            </div>
        </div>
        <div className="TopPicks">
            <Link  to="/RisingArtists">
                <div className="TopPicksBanner">
                    <h1 className="TopPicksText">Browse Today's Top Artist Picks</h1>
                </div>
            </Link>
        </div>
        <div className='container CategoryDisplay__container'>
            {categories && (
                <div className="categoriesColumn" ref={widthRef}>
                    {categories.map((category, index) => 
                        <div key={index}>
                        {category._id.length && (
                            <motion.div 
                                className="categoryRow"
                                key={category._id}
                                initial={{opacity: 0,y: '200%'}}
                                animate={{opacity: 1,y: '0%'}}
                                exit={{opacity: 0,y: '-200%'}}
                                transition={{delay: 0.5, duration: 1}}
                            >
                                <motion.div className="category_button categoryName"
                                    
                                >
                                    <Link to={`/Category/${category._id}`}>
                                        {category.name}
                                    </Link>
                                </motion.div>
                                <div className="categoryProductImages">
                                    <motion.div className={"carousel "+index} >
                                        <motion.div className='inner-carousel' 
                                            drag="x" 
                                            dragConstraints={{right:0, left: -(widths[index])}}
                                            whileTap={{cursor: "grabbing"}}
                                        >
                                            {category.products_id.map((product) =>
                                                <motion.div key={product._id} className='product_Card'>
                                                    <div className="product_image_Display">
                                                        <img src={process.env.REACT_APP_SERVER_HOSTNAME + product.thumbnailURL} alt={product.name} />
                                                    </div>
                                                    <Link to={`/Item/${product._id}`}>
                                                    <div className="product_info_Display">
                                                        <h4>"{product.name}"</h4>
                                                    </div>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </div> 
                            </motion.div>
                        )}
                        </div>
                    )}
                </div>
            )}
        </div>
    </motion.div>
  )
}

export default CategoryDisplay