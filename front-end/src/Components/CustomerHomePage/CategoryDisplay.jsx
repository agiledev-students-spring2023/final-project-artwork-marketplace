import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, FreeMode } from "swiper"
import './categoryDisplay.css'
import "swiper/css"
import "swiper/css/pagination"
import randomFakeData from './randomFakeData'

const CategoryDisplay = props => {
  const [categories, setCategories] = useState([])
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    const getCategories=()=>{
        setCategories(randomFakeData)
    }
    getCategories()
  }, [])

  const handleSearch = (e) => {
    if(e.target.value == ''){
        setCategories(randomFakeData)
    }
    else{
        const SearchResult = randomFakeData.filter(item => item.category.toLowerCase().includes(e.target.value.toLowerCase()))
        setCategories(SearchResult)
    }
    setSearchValue(e.target.value)
  }
  
  return (
    <>
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
                    {categories.map((category) => 
                        <div>
                        {category.products.length && (
                            <div className="categoryRow">
                                <div className="category_button categoryName">
                                    <Link to={`/Category/${category.id}`}>
                                        {category.category}
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
                                        freeMode={true}
                                        rewind={true}
                                        speed="1s"
                                    >
                                    {category.products.map((product) =>
                                        <>
                                            <SwiperSlide 
                                                key={product.id}
                                            >
                                                <div className="SwiperProductImage">
                                                <Link to={`/ViewItem/${product.id}`}>
                                                    <img src={product.imageURL} alt={product.productName} />
                                                </Link>
                                                </div>
                                            </SwiperSlide>
                                        </>
                                    )}
                                    </Swiper>
                                </div> 
                            </div>
                        )}
                        </div>
                    )}
                </div>
            )}
        </div>
    </>
  )
}

export default CategoryDisplay