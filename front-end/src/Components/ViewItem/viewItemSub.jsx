/* part of the layout design for this component is inspired from: 
  https://www.youtube.com/watch?v=hVf6zDbrswc&t=146s
*/

import React, {useState, useParams, createRef, useEffect} from 'react'
import './viewItemSub.css'
import productsData  from './productsData' 

const ViewItemSub = () => {
  const productId = "2";
  const [thisProduct,setProduct] = useState({
    products: productsData.find(prod => prod._id === productId)
    }
  )

  const [showMore, setShowMore] = useState(false); 
  const [buyNum, setBuyNum] = useState(0);
  const [changePhoto, setChangePhoto] = useState(0); 

  function handleSmallPhotoClick(index){
    for (let i = 0; i < thisProduct.products.src.length; i++){
      thisProduct.products.activeOrNot[i] = "";
    }
    thisProduct.products.activeOrNot[index] = "active";
    console.log(index);
    console.log(thisProduct.products.activeOrNot)
    setChangePhoto(changePhoto + 1)
  }

  /* handle whether to show the detailed description */
  /* for the elegance of page */
  function handleMoreClick(){
    setShowMore(!showMore);
  }

  /* handle how many items are purchased */
  function addItemToCart(){
    setBuyNum(buyNum + 1);
    console.log('current buy num:',{buyNum});
  }

  /* find the current active photo to display */
  function findActive(){
    const indexFind = thisProduct.products.activeOrNot.findIndex(prod => prod === "active");
    return thisProduct.products.src[indexFind]
  }

  const myRef = createRef();
  
  return(
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img src={findActive()} alt=""/>
          </div>
          <div className="box">
            <div className="row">
              <h2>{thisProduct.products.title}</h2>
              <span>${thisProduct.products.price}</span>
            </div>
            <p>{thisProduct.products.description}</p>
            <p>{thisProduct.products.content}</p>
            <button className="button" onClick={handleMoreClick}>
              {showMore ? 'Hide' : 'Show'} details
            </button>
            {showMore && 
              <p className="detailedsetup">{thisProduct.products.detailcontent}</p>
            }
            <br/>
            <div className='thumb'>
              {thisProduct.products.src.map((thispic,index) => {
                return(
                  <img src={thispic} key={Math.random()} onClick={() => handleSmallPhotoClick(index)}/>
                )
              })}
            </div>
            <button className="cart" onClick={addItemToCart}>
              Add to cart
            </button>
            <p className='buynum'>
              Current Buy Number: {buyNum}  
            </p>
          </div>
        </div>
      </div>
  )
}

export default ViewItemSub

