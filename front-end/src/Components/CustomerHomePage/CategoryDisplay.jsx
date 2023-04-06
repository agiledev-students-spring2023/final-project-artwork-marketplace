import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, FreeMode } from "swiper"
import { motion } from 'framer-motion'
import './categoryDisplay.css'
import "swiper/css"
import "swiper/css/pagination"
import axios from "axios"


const CategoryDisplay = props => {
  const [categories, setCategories] = useState([])
  const [copyOfCategories, setCategoriesCopy] = useState([])
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    const getCategories = async ()=>{
        try{
            const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`)
            const categoriesCopy = getCategories.data
            const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
            const AllProducts = getProducts.data
            categoriesCopy.forEach(category => {category['products'] =  AllProducts.filter(product => category.products_id.includes(product._id))})    
            setCategories(categoriesCopy)
            setCategoriesCopy(categoriesCopy)
        }
        catch (err){
            console.log(err)
        }
    }
    getCategories()
  }, [])

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
        <div className='container searchBar__container'>
            <input className='searchBarTextField' placeholder='Search Categories' value={searchValue} onInput={(e) => handleSearch(e)}/> 
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
                <div className="categoriesColumn">
                    {categories.map((category, index) => 
                        <div>
                        {category.products.length && (
                            <motion.div 
                                className="categoryRow"
                                key={category._id}
                                initial={{opacity: 0,y: '200%'}}
                                animate={{opacity: 1,y: '0%'}}
                                exit={{opacity: 0,y: '-200%'}}
                                transition={{delay: 0.5, duration: 1}}
                            >
                                <div className="category_button categoryName">
                                    <Link to={`/Category/${category._id}`}>
                                        {category.name}
                                    </Link>
                                </div>
                                <div className="categoryProductImages">
                                    <Swiper
                                        breakpoints={{
                                            0: {
                                                width: 0,
                                                slidesPerView: 1,
                                            },
                                            // when window width is >= 640px
                                            600: {
                                            width: 600,
                                            slidesPerView: 2,
                                            },
                                            // when window width is >= 768px
                                            1024: {
                                            width: 1024,
                                            slidesPerView: 3,
                                            },
                                        }}
                                        slidesPerView={3}
                                        spaceBetween={30}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination, FreeMode]}
                                        className="mySwiper"
                                        freeMode={false}
                                        rewind={true}
                                        speed={0.1}
                                    >
                                    {category.products.map((product) =>
                                        <div key={product._id}>
                                            <SwiperSlide 
                                                key={product._id}
                                            >
                                                <div className="SwiperProductImage">
                                                <Link to={`/Item/${product._id}`}>
                                                    <img src={product.thumbnailURL} alt={product.name} />
                                                </Link>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    )}
                                    </Swiper>
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