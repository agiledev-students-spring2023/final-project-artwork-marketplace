import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, FreeMode } from "swiper"
import './categoryDisplay.css'
import "swiper/css"
import "swiper/css/pagination"

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

  const [randomFakeData, setRandomFakeData] = useState([
    {
        id: 1,
        category: "modern",
        products: [
            {
                id: 11,
                productName: "product1aiushdiuashdiuashdiaushdiuashdiuashdiashdiusah",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400/200",
            },
            {
                id: 12,
                productName: "product2",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/300/500",
            },
            {
                id: 13,
                productName: "product3",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400",
            },
            {
                id: 14,
                productName: "product4",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/500/350",
            },
            {
                id: 15,
                productName: "product5",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/700/300",
            },
            {
                id: 16,
                productName: "product6",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/200/300",
            },
        ],
    },
    {
        id: 2,
        category: "realism",
        products: [
            {
                id: 21,
                productName: "product1aiushdiuashdiuashdiaushdiuashdiuashdiashdiusah",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400/200",
            },
            {
                id: 22,
                productName: "product2",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/300/500",
            },
            {
                id: 23,
                productName: "product3",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400",
            },
            {
                id: 24,
                productName: "product4",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/500/350",
            },
            {
                id: 25,
                productName: "product5",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/700/300",
            },
            {
                id: 26,
                productName: "product6",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/200/300",
            },
        ],
    },
    {
        id: 3,
        category: "classic",
        products: [
            {
                id: 31,
                productName: "product1aiushdiuashdiuashdiaushdiuashdiuashdiashdiusah",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400/200",
            },
            {
                id: 32,
                productName: "product2",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/300/500",
            },
            {
                id: 33,
                productName: "product3",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/400",
            },
            {
                id: 34,
                productName: "product4",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/500/350",
            },
            {
                id: 35,
                productName: "product5",
                productArtist: "Artist Name",
                imageURL: "https://picsum.photos/700/300",
            },
        ]
    },
    ])
  
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