import React, {useState, useEffect, useParams} from 'react'
import './profileSub.css'
import AllUsers from '../../SchemaSamples/AllUsers'
import AllProducts from '../../SchemaSamples/AllProducts'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

const ProfileSub = props => {
    /* take one artist as an example */
    const artistId = 1;
    const artistFind = AllUsers.find(elem => elem._id === artistId);
    const artistName = artistFind.name; 
    const artistEmail = artistFind.email;
    const products = artistFind.products_uploaded;
    const productsList = []; 
    for (let i = 0; i < products.length; i++){
        const prodId = products[i];
        const findProduct = AllProducts.find(elem => elem._id === prodId);
        const needData = {url: findProduct.thumbnailURL, name: findProduct.name, price: "$"+findProduct.price};
        productsList.push(needData);
    }
    console.log(productsList)

    let gallery
    if (productsList.length > 0){
        gallery = (
            <ImageList sx={{ width: 500, margin: 'auto' }}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Gallery Showcase</ListSubheader>
            </ImageListItem>
            {productsList.map((item) => (
                <ImageListItem key={Math.random()}>
                <img
                    src={`${item.url}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.name}
                    subtitle={item.price}
                />
                </ImageListItem>
            ))}
        </ImageList>
        )
    } else {
        gallery = (
            <div>You Have NOT Published Anything Yet!!</div>
        )
    }

    return(
        <div className='profilebodyset'>
            <h3 className='profileplace'>
                PROFILE PAGE
            </h3>
            <h3>
                {artistName}
                <ul/>
                {artistEmail}
            </h3>
            {gallery}
        </div>
    )
}

export default ProfileSub

