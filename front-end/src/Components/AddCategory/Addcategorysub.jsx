import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Addcategorysub = props => {
  const navigate = useNavigate()
  const categoryName = useRef()

  const handleLogOut = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/logout`, {withCredentials: true})
    if (res.data.success === true){
      alert("You have been logged out. Please Log In again to continue.")
      localStorage.removeItem("user")
      props.setuser({})
      navigate("/")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCategory = {
      'name': categoryName.current.value,
      'products_id': []
    }
    try{
      await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories/addCategory`,
        newCategory, 
        {withCredentials: true}
      )
      .then(res => {
        navigate("/AddArt")
      })
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

  return (
    <div className="container LNA_container">
      <div className="LNA_headers">
        <h2 className="LNA_header">
            Post A New Category
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="LNA_titleInput">
        <h5 className="LNA_titlePrompt">Name Your New Category</h5>
        <input 
          className='titleField'
          type='text' 
          placeholder='Category Title'
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