import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './artistProducts.css'
import { useLocation, useNavigate } from 'react-router-dom';


const ArtistProducts = props => {
  const [username, setUsername] = useState("")
  const [widths, setWidths] = useState([]);
  const widthRef = useRef()
  const [categories, setCategories] = useState([])
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
    const getArtistInfo = async () => {
      try{
        const artist_id = props.user._id
        const artist_name = props.user.name.full
        const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`,
          {withCredentials: true}
        )
        const categories = getCategories.data
        const categoriesFilter = categories.filter(category => category.products_id.length > 0)
        await categoriesFilter.forEach(category => category.products_id = category.products_id.filter(product => product.artist_id === artist_id))
        setCategories(categoriesFilter)
        setUsername(artist_name)
      } catch (err){
        // if invalid token
        if(err.response.status === 401){
          handleLogOut()
        }
        else{
          console.log(err)
        }
      }
    }
    getArtistInfo()
  }, [])

  useEffect(() => {
    const allCarousels = widthRef.current.querySelectorAll('.carousel')
    const widthsSet = []
    allCarousels.forEach((carousel, index) => widthsSet[index] = carousel.scrollWidth - carousel.offsetWidth + 15)
    setWidths(widthsSet)
  }, [categories])

  return (
    <motion.div
      initial={{opacity: 0, y: '100%'}}
      animate={{opacity: 1, y: '0%'}}
      exit={{opacity: 0, y: '-100%'}}
      transition={{duration: 1, delay: 0.5}}
      className='page_artistHomePage' 
    >
      {/* Welcome Message */}
      {username &&(
        <div className="PerformanceMSG">
          <Link to="/Analytics">
            <div className='PerformanceBanner'>
              <h1>Check Out Your Performance As An Artist!</h1>
            </div>
          </Link>
        </div> 
      )}
      <div className='container ArtistCategoryDisplay_container'>   
        {categories.length !== 0 &&(
          <div className="sectionHeading">
            <h2 className="labell">Your Artworks</h2>
          </div>
        )}
        {categories.length === 0 &&(
          <div className="sectionHeading">
            <h2 className="labell">Please Add An Artwork To Get Started As An Artist!</h2>
          </div>
        )}
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
                                    <Link to={`/`}>
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

export default ArtistProducts