import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductDisplay from '../Components/CategoryPage/ProductDisplay'

const Category = props => {
    return (
      <div>
        <ProductDisplay user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default Category