import React, {useEffect, useState} from 'react'
import './addartwork.css'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import { Alert } from 'react-native'
import AllCategories from '../../SchemaSamples/AllCategories'

 
const AddArtWork = props => {
    const [addrtype, setAddrtype] = useState([])

    const [file,setFile] = useState()
    const [file2,setFile2] = useState()
    const [file3,setFile3] = useState()
    const [theName,setName] = useState("")
    const [thePrice,setPrice] = useState("")
    const [theNum,setNum] = useState("")
    const [theDescription,setTheDescription] = useState("")

    var testcase = [];
    for (var i = 0; i < AllCategories.length; i++){
        testcase.push(AllCategories[i].name);
    }

    const [selected, setSelected] = useState('')

    const apiUrl = "https://my.api.mockaroo.com/moviegenre.json?key=512c4f30"

    const getGenre = async() => {
        try{
            const response = await axios.get(apiUrl)
            console.log(`success: ${response.status}`)
            const data = response.data
            console.log(data)
            data.forEach((obj,i,arr) => {
                if (addrtype.length < 10){ 
                    addrtype.push(obj.genre)
                }
            })
            // console.log(addrtype)
        } catch(err){
            // console.log(`failure: ${err}`)
        }
    };

    useEffect(() =>{
        getGenre();
    },[addrtype]);

    /* check whether inputs are numeric */
    /* for PRICE input only */
    function checkNumber(val,indi){
        val = val.replace(/[^\d]/g, '');
        if (indi === 1){
            setPrice(val);
        }
        else if (indi === 2){
            setNum(val);
        }
    }

    /* check whether inputs are character/special character only */
    /* for NAME input only */
    function checkCharacter(val){
        val = val.replace(/[\u4e00-\u9fa50-9]/g,'');
        setName(val);
    }
    
    /* maximum 3 photos */ 
    function handleChange(event){
        console.log(event.target.files)
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    function handleChange2(event){
        console.log(event.target.files)
        setFile2(URL.createObjectURL(event.target.files[0]));
    }

    function handleChange3(event){
        console.log(event.target.files)
        setFile3(URL.createObjectURL(event.target.files[0]));
    }

    function handleSubmit(event){
        event.preventDefault()
        if (theName.length === 0 || thePrice.length === 0 || theNum.length === 0 || theDescription.length === 0 /* check if the inputs are valid*/
            || theNum === 0 || thePrice === 0 /* check if the numbers are positive */
            || typeof(file) === 'undefined'
            ){
                alert('Incorrect Information Input. Please check the format and redo it. ')
        }
        else{
            alert('You have successfully added an artwork! ')
        }
    }
    
    function refreshPage() {
        window.location.reload(false);
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
                <img className="photopic" src={file} />
                <input type="file" onChange={handleChange2}/>
                <img className="photopic" src={file2}/>
                <input type="file" onChange={handleChange3}/>
                <img className="photopic" src={file3}/>
                <input type='text' placeholder='Name: Characters Only' value={theName} onChange={(e) => checkCharacter(e.target.value)} />
                <input type='text' placeholder='Price: Digits Only' value={thePrice} onChange={(e) => checkNumber(e.target.value,1)} />
                <input type='text' placeholder='Number: Digits Only' value={theNum} onChange={(e) => checkNumber(e.target.value,2)} />
                <TextareaAutosize type='text' placeholder='Decription' value={theDescription} onChange={(e) => setTheDescription(e.target.value)} 
                style={{ width: "25%" }} minRows={2} maxRows={10}/>
                <br/>
                <br/>
                <h3>
                    Category Selection
                </h3>

                <form> 
                    <select value={selected} onChange={e => setSelected(e.target.value)}> 
                        {testcase.map((value) => (
                            <option value={value} key={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </form>
            
                <form onSubmit={handleSubmit}>
                    <input type='submit' value='save' />  
                </form>

                
            </div>
        </div>
        
    );

}

export default AddArtWork

