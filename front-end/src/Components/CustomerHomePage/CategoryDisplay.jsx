import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
            const categories = getCategories.data
            const categoriesFilter = categories.filter(category => category.products_id.length > 0)
            setCategories(categoriesFilter)
            setCategoriesCopy(categoriesFilter)
        }
        catch (err){
            if(err.response.status === 401){
                handleLogOut()
            }
            else{
                console.log(err)
            }
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
        const SearchResult = categories.filter(category => category.name.toLowerCase().includes(e.target.value.toLowerCase()))
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
                        {category.products_id.length && (
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