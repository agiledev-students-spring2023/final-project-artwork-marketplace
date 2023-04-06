import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import './addartwork.css'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import Select from "react-select";
import { useNavigate } from 'react-router-dom'

const AddArtWork = props => {
    const navigate = useNavigate()
    const [AllCategories, setAllCategories] = useState([])
    const [addrtype, setAddrtype] = useState([])
    const [file,setFile] = useState()
    const [file2,setFile2] = useState()
    const [file3,setFile3] = useState()
    const [theName,setName] = useState("")
    const [thePrice,setPrice] = useState("")
    const [theNum,setNum] = useState("")
    const [theDescription,setTheDescription] = useState("")
    const [genres, setGenres] = useState([]);

    const handleSkillChange = (genres) => {
        setGenres(genres || []);
    }
    useEffect(() => {
        const saveCategories = async () => {
          try{
            const getCategories = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/categories/`)
            const Categories = getCategories.data
            setAllCategories(Categories)
          } catch (err){
            console.log(err)
          } 
        }
        saveCategories()
    }, [])

    var testcase = [];
    for (var i = 0; i < AllCategories.length; i++){
        testcase.push({'label': AllCategories[i].name, 'value': AllCategories[i]._id});
    }

    /* check whether inputs are numeric */
    /* for PRICE input only */
    function checkNumber(val,indi){
        val = val.replace(/[^\d]/g, '');
        if (indi === 1) setPrice(val); 
        else if (indi === 2) setNum(val); 
    }

    /* check whether inputs are character/special character only */
    /* for NAME input only */
    function checkCharacter(val){
        val = val.replace(/[\u4e00-\u9fa50-9]/g,'');
        setName(val);
    }
    
    /* maximum 3 photos */ 
    function handleChange(event){
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    function handleChange2(event){
        setFile2(URL.createObjectURL(event.target.files[0]));
    }

    function handleChange3(event){
        setFile3(URL.createObjectURL(event.target.files[0]));
    }

    /* submit function */
    const handleSubmit = async(e) =>{
        e.preventDefault()

        var categoryresult = [];
        for (var i = 0; i < genres.length; i++){
            categoryresult.push(genres[i].value);
        }

        /* let the user to further edit */
        if (theName.length === 0 || thePrice.length === 0 || theNum.length === 0 || theDescription.length === 0 /* check if the inputs are valid*/
            || theNum === 0 || thePrice === 0 /* check if the numbers are positive */
            || typeof(file) === 'undefined' /* check if at least one photo is uploaded */
            || categoryresult.length === 0 /* no genre is select */
            ){
                alert('Incorrect Information Input. Please check the format and redo it. ')
        }
        /* successful adding of product */
        else{
            alert('You have successfully added an artwork! ')   
            /* product profile */
            const newProduct = {
                _id: Math.random(),
                artist_id: props.user._id,
                name: theName,
                shortDescription: theDescription,
                price: thePrice,
                status: "available",
                thumbnailURL: "",
                categories_id: categoryresult,
                imagesURL: ["","",""]
            }
            /* check server here but for now just print user data to console
            try{
                await axios.post(...)
            }
            */
            console.log(newProduct)  
            navigate("/")       
        }
    }

    return (
        <div className='addartbodyset'>
            <h3 className='addartplace'>
                Add NEW WORK
            </h3>
            <h3>
                Image Illustration
            </h3>
            <h4>
                Maximum 3 Photos; Please Upload Sequentially. 
            </h4>
            <div className='addworkset'>                 
                <input type="file" onChange={handleChange}/>
                <img className="photopic" src={file}/>
                <input type="file" onChange={handleChange2}/>
                <img className="photopic" src={file2}/>
                <input type="file" onChange={handleChange3}/>
                <img className="photopic" src={file3}/>

                <input type='text' placeholder='Name: Characters Only' value={theName} onChange={(e) => checkCharacter(e.target.value)}/>
                <input type='text' placeholder='Price: Digits Only' value={thePrice} onChange={(e) => checkNumber(e.target.value,1)}/>
                <input type='text' placeholder='Number: Digits Only' value={theNum} onChange={(e) => checkNumber(e.target.value,2)}/>

                <TextareaAutosize type='text' placeholder='Decription' value={theDescription} onChange={(e) => setTheDescription(e.target.value)} 
                style={{ width: "25%", fontSize: 15}} minRows={2} maxRows={10}/>
                <br/>
                <br/>
                <h3>
                    Category Selection(s)
                </h3>
                <div style={{width:'300px', margin:'auto', fontSize:15}}>
                    <Select 
                        options={testcase} 
                        onChange={handleSkillChange} 
                        value={genres} 
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        menuPlacement="auto"
                        menuPosition="fixed"
                    />
                </div>
            
                <form onSubmit={handleSubmit}>
                    <input type='submit' value='SUBMIT!' />  
                </form>
            </div>
        </div>  
    );

}

export default AddArtWork