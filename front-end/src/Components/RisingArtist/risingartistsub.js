/* This code is partially referred from: 
-- https://www.youtube.com/@MonsterlessonsAcademy
-- https://mui.com/material-ui/react-card/
*/


import React, { useState, useEffect} from 'react'
import fakedata from './fakedata'
import './risingartistsub.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FiHeart } from "react-icons/fi"

/* search bar function */
const SearchBar = ({callback}) => {
  const [val, setVal] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault()
    callback(val)
  }
  
  return (
    <form className="rs-searchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="artist's & artwork's name"
        className="rs-searchBarInput"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </form>
  );
};

const ArtistShowcase = ({val}) => {
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
              {/* <FiHeart onClick={() => loveArtist(artwork)} className="rs-heart" />               */}
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

const fetchArtworks = (inputValue) => {
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

const Risingartistsub = () => {
  const [articles, setArticles] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setArticles([]);
    fetchArtworks(inputValue).then((articles) => {
      setArticles(articles);
    });
  }, [inputValue]);
  
  return (
    <div className="rs-container">
      <h3 className='rs-caption'>
        Rising-Star Artists
      </h3>
      <SearchBar callback={(inputValue) => setInputValue(inputValue)} />
      <br/>
      <br/>
      <ArtistShowcase val={articles} />
    </div>
  );
}

export default Risingartistsub

