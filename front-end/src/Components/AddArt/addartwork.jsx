import React, {useEffect, useState, useMemo} from 'react'
import './addartwork.css'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

 
const AddArtWork = () => {
    const [addrtype, setAddrtype] = useState([])

    const [file,setFile] = useState()
    const [theName,setName] = useState("")
    const [thePrice,setPrice] = useState("")
    const [theDescription,setTheDescription] = useState("")
    
    const testcase = ['comedy','laugh','smile'];

    const [selected, setSelected] = useState('')

    const animatedComponents = makeAnimated();

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
            console.log(addrtype)
        } catch(err){
            console.log(`failure: ${err}`)
        }
    };

    useEffect(() =>{
        getGenre();
    },[addrtype]);

    
    
    /* check whether inputs are numeric */
    /* for PRICE input only */
    function checkNumber(val){
        val = val.replace(/[^\d]/g, '');
        setPrice(val);
    }

    /* check whether inputs are character/special character only */
    /* for NAME input only */
    function checkCharacter(val){
        val = val.replace(/[\u4e00-\u9fa50-9]/g,'');
        setName(val);
    }
    
    function handleChange(event){
        console.log(event.target.files)
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    function handleSubmit(event){
        event.preventDefault()
        /* test */ 
        console.log('SUBMIT TEST')
        console.log(theName)
        console.log(thePrice)
        console.log(theDescription)
        console.log(selected)
    }
    
    // if (addrtype.length === 0) return <div>loading...</div>
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className='bodyset'>
            <h2 className='place'>
                Add NEW WORK
            </h2>
            <h3>
                Image Illustration
            </h3>
            <div className='addworkset'>                
                <input type="file" onChange={handleChange} />
                <img className="photopic" src={file} />
                <input type='text' placeholder='Name' value={theName} onChange={(e) => checkCharacter(e.target.value)} />
                <input type='text' placeholder='Price' value={thePrice} onChange={(e) => checkNumber(e.target.value)} />
                <TextareaAutosize type='text' placeholder='Decription' value={theDescription} onChange={(e) => setTheDescription(e.target.value)} />
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

