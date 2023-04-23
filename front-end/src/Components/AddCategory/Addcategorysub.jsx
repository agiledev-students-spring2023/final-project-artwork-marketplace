import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import NumericInput from 'react-numeric-input'
import Multiselect from 'multiselect-react-dropdown'
import { FiUpload } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'

const Addcategorysub = props => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getAllCategories = async () => {
        try{
            const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`,
                {withCredentials: true},
            )
            const allCategories = getCategories.data
            setCategories(allCategories)
        } catch (err){
            // if invalid token
            if(err.response.status === 401){
                localStorage.removeItem("user")
                props.setuser({})
                navigate("/")
            }
            else{
                console.log(err)
            }
        }
    }
    getAllCategories()
  }, [])

  const categoryName = useRef()

  /* submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    /* want-to-add category name */
    const newcatname = categoryName.current.value
    var checker = 0; 
    for (var i = 0; i < categories.length; i++){
      const catname = categories[i].name
      /* check whether the category is already included */
      if ((catname.toLowerCase()).includes(newcatname.toLowerCase()) 
      ||(newcatname.toLowerCase()).includes(catname.toLowerCase())  == 1){
        alert("Similar Category is already included in Current List! Please Check it AGAIN!")
        checker = checker + 1
      } 
    }
    if (checker === 0){
      const newCategory = {
        'name': newcatname,
        'products_id': []
      }
      try{
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories/addCategory`,
        newCategory, 
            {withCredentials: true}
        )
        .then(res => {
            console.log(res)
            navigate("/AddArt")
            alert("You have ADD A NEW CATEGORY! NICE!")
        })
        console.log('success')
      } catch (err){
        // if invalid token
        if(err.response.status === 401){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            props.setuser({})
            navigate("/")
        }
        else{
            console.log(err)
        }
      }
    }

  }

  return (
    <div className="container LNA_container">
      <div className="LNA_headers">
        <h2 className="LNA_header">
            Post A New Category
        </h2>
      </div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className="LNA_titleInput">
        <h5 className="LNA_titlePrompt">Name Your New Category</h5>
        <input 
            className='titleField'
            type='text' 
            placeholder='Title'
            ref={categoryName}
        />
      </div>
      <button className="LNA_postArtworkButton" type='submit'>
        Save NEW Category
      </button>
      </form>
    </div>
  )
}

export default Addcategorysub