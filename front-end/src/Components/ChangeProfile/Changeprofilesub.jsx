import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FiUpload } from 'react-icons/fi'

const Changeprofilesub = props => {
  const navigate = useNavigate()
  const categoryName = useRef()
  const [artworkImages, setArtworkImages] = useState([])
  const [artworkImagesDisplay, setArtworkImagesDisplay] = useState([])

  // images
  const handleFilesChange = e => {
    const image = e.target.files[0]
    setArtworkImages([...artworkImages, image])
    setArtworkImagesDisplay([...artworkImagesDisplay, URL.createObjectURL(image)])
  }
  const handleRemoveImageUploaded = (index) => {
    const artworkImagesArray = [...artworkImages]
    const artworkImagesDisplayArray = [...artworkImagesDisplay]
    artworkImagesArray.splice(index, 1)
    artworkImagesDisplayArray.splice(index, 1)
    setArtworkImages(artworkImagesArray)
    setArtworkImagesDisplay(artworkImagesDisplayArray)
  }

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
            Change Your Profile Photo
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="LNA_imagesInput">
              <div className="LNA_promptAndIcon">
                  <h5 className="LNA_imagesPrompt">Upload Images of your Artwork (One Image Only):</h5>
                  <label htmlFor='LNA_inputFileUpload'>
                      <input 
                          className='filesUploadField'
                          type='file'
                          id='LNA_inputFileUpload'
                          accept='.png, .jpg, .jpeg'
                          multiple
                          onChange={handleFilesChange}
                          hidden
                      />
                      <FiUpload className='filesUploadIcon'/>
                  </label>
              </div>
              <div className="LNA_uploadedImagesDisplay">
                  {artworkImagesDisplay.length !== 0 && (
                      <>
                          {artworkImagesDisplay.map((imageURL, index) => 
                              <div className="LNA_uploadedImageCard" key={imageURL}>
                                  <button 
                                      className="LNA_removeUploadedImageButton"
                                      onClick={() => handleRemoveImageUploaded(index)}
                                      type='button'
                                  >
                                      X
                                  </button>
                                  <img src={imageURL} alt="" />
                              </div>
                          )}
                      </>
                  )}
              </div>
          </div>
      <button className="LNA_postArtworkButton" type='submit'>
        UPLOAD
      </button>
      </form>
    </div>
  )
}

export default Changeprofilesub