import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import NumericInput from 'react-numeric-input'
import Multiselect from 'multiselect-react-dropdown'
import { FiUpload } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'
import './ListNewArtwork.css'

const ListNewArtwork = props => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  
  useEffect(() => {
    const getAllCategories = async () => {
        try{
            const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories`,
                {headers:{Authorization: `JWT ${localStorage.getItem("token")}`}},
            )
            const allCategories = getCategories.data
            setCategories(allCategories)
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
    getAllCategories()
  }, [])
  
  const artistID = props.user._id ? props.user._id : JSON.parse(localStorage.getItem('user')._id)
  const [artworkImages, setArtworkImages] = useState([])
  const [artworkImagesDisplay, setArtworkImagesDisplay] = useState([])
  const [artworkCategories, setArtworkCategories] = useState([])
  const [artworkPrice, setArtworkPrice] = useState()
  const artworkName = useRef()
  const artworkDescription = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    
    const images = artworkImages
    images.forEach((image) => formData.append('user_uploads', image))
    
    const artworkCategoriesID = artworkCategories.map(category => category._id)
    artworkCategoriesID.forEach((id) => formData.append('categories_id', id))
    
    formData.append('artist_id', artistID)
    formData.append('name', artworkName.current.value)
    formData.append('price', artworkPrice)
    formData.append('shortDescription', artworkDescription.current.value)
    try{
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks/AddArt`,
            formData, 
            {headers:{Authorization: `JWT ${localStorage.getItem("token")}`}}
        )
        .then(res => {
            console.log(res)
            // update user in local storage and props - NOT YET DONE
            navigate("/")
        })
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

  // categories
  const handleSelectCategories = (selectedList, selectedItem) => {
    setArtworkCategories([...artworkCategories, selectedItem])
  }
  const handleRemoveCategories = (selectedList, removedItem) => {
    setArtworkCategories(artworkCategories.filter(category => category._id !== removedItem._id))
  }

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

  // price
  const priceFormat = (num) => {
    return num + ' $'
  }
  const parsePrice = (stringPrice) => {
    return stringPrice.replace(/^\$/ , "")
  }

  return (
    <div className="container LNA_container">
        {error && error !== "" && (
            <div className="LNA_errors">
                <h4 className='LNA_error'>{error}</h4>
            </div>
        )}
        <div className="LNA_headers">
            <h2 className="LNA_header">
                Post A New Artwork
            </h2>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="LNA_titleInput">
                <h5 className="LNA_titlePrompt">Title Your Artwork:</h5>
                <input 
                    className='titleField'
                    type='text' 
                    placeholder='Title'
                    ref={artworkName}
                />
            </div>
            <div className="LNA_priceInput">
                <h5 className="LNA_pricePrompt">Price Your Artwork:</h5>
                <NumericInput 
                    className='priceField'
                    placeholder='Price (USD)'
                    min={1}
                    onChange={(value) => setArtworkPrice(value)}
                    value={artworkPrice}
                    format={priceFormat}
                    parse={parsePrice}
                />
            </div>
            <div className="LNA_descriptionInput">
                <h5 className="LNA_descriptionPrompt">Describe Your Artwork (Max 100 Characters):</h5>
                <input 
                    className='descriptionField'
                    type='text' 
                    placeholder='Description'
                    minLength={5}
                    maxLength={100}
                    ref={artworkDescription}
                />
            </div>
            
            {categories && categories.length !== 0 && (
                <div className="LNA_categoriesInput">
                    <div className="LNA_categoriesPrompts">
                        <h5 className="LNA_categoriesPrompt">Categorize Your Artwork:</h5>
                        <h6 className="LNA_categoriesPrompt">
                            Don't see the right category? {" "}
                            <Link className='LNA_categoriesButton' to={"/AddCategory"}>
                                Create One
                            </Link>
                        </h6>
                    </div>
                    <Multiselect
                        options={categories} 
                        selectedValues={artworkCategories} 
                        onSelect={handleSelectCategories} 
                        onRemove={handleRemoveCategories} 
                        displayValue="name" 
                        placeholder='Categories'
                        className='categoriesSelectField'
                    />
                </div>
            )}
            <div className="LNA_imagesInput">
                <div className="LNA_promptAndIcon">
                    <h5 className="LNA_imagesPrompt">Upload Images of your Artwork (Max 3 Images):</h5>
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
                Post Artwork
            </button>
        </form>
    </div>
  )
}

export default ListNewArtwork