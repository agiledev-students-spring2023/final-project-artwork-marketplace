import React, { useState, useEffect} from 'react'
import fakedata from '../../SchemaSamples/fakedata'
import './risingartistsub.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FiHeart}  from "react-icons/fi"
import axios from "axios"
import { Link } from 'react-router-dom'

/* search bar function */
const SearchBar = ({callback}, props) => {
  const [val, setVal] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault()
    callback(val)
  }
  
  return (
    <form className="rs-searchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="artist's work & artwork's name"
        className="rs-searchBarInput"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </form>
  );
};

const ArtistShowcase = ({val}, props) => {
  const viewItem = (val) => {
    console.log("KNOW MORE: ", {val})
  }

  const loveArtist = (val) => {
    val.loved = Math.abs(val.loved - 1)
    console.log(val.name, ": ", val.loved)
  }

  return(
    <div>
      {val.map((artwork) => (
        <div key={artwork.id}>{
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia 
                sx = {{ height: 300 }}
                image = {artwork.productlink[0]}
                title = {artwork.productname[0]}
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {artwork.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {artwork.productname.map(function(name,index){return <li key={index}>{name}</li>})}
              </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => viewItem(artwork.name)}>Learn More</Button>
              <FiHeart onClick={() => loveArtist(artwork)} className="rs-heart" />              
              <Button onClick={() => loveArtist(artwork)}>Follow</Button>
            </CardActions>
          </Card>
          
        }
        <br/>
        </div>
        
      ))}
    </div>
  );
};

const fetchArtworks = (inputValue, props) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (inputValue === "") {
        resolve(fakedata);
        return;
      }
      /* allow searching both through artists' names and their products' names */
      const filteredArticles = fakedata.filter((article) =>
        article.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        article.productname.some(element => {
          if (element.toLowerCase().includes(inputValue.toLowerCase())){
            return true;
          }
          return false;
        })
      );

      resolve(filteredArticles);
    }, 500);
  });
};

function randomNumberInRange(min, max) {
  // get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findBestProduct(manyProducts) {
  const bestProductind = randomNumberInRange(1,manyProducts.length)
  const bestProduct = manyProducts.filter(product => product._id === bestProductind)
  return bestProduct[0]
}



const Risingartistsub = props => {
  const [articles, setArticles] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [manyProducts, setManyProducts] = useState([])

  useEffect(() => {
    setArticles([]);
    fetchArtworks(inputValue).then((articles) => {
      setArticles(articles);
    });

    /* load the data from backend */
    const getCategories = async ()=>{
        try{
            const getProducts = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/artworks`)
            const AllProducts = getProducts.data
            setManyProducts(AllProducts)
        }
        catch (err){
            console.log(err)
        }
    }
    getCategories()
  }, [inputValue]);

  const bestProduct = findBestProduct(manyProducts);
  console.log(bestProduct)
  
  return (
    <div className="rs-container">
      <h3 className='rs-caption'>
        Rising-Star Artists
      </h3>
      <h3 className='rs-subcaption'>
        The Top Artwork Recently
      </h3>

      { bestProduct ? (
        <div className="smallimageshow">
          <Link to={`/Item/${bestProduct._id}`}>
            <img src={bestProduct.thumbnailURL} alt={bestProduct.name} />
          </Link> 
          <h3 className='rs-subcaption2'>
                {bestProduct.name} <br/>
                ${bestProduct.price} <br/>
                {bestProduct.shortDescription}
          </h3>
        </div>
      ): (
        <div></div>
      )}
      <br/>
      <br/>
      <SearchBar callback={(inputValue) => setInputValue(inputValue)} />
      <br/>
      <br/>
      <ArtistShowcase val={articles} />
    </div>
  );
}

export default Risingartistsub