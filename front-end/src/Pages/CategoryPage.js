import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductDisplay from '../Components/CategoryPage/ProductDisplay'
import Settings from '../Components/Settings/Settings'

const Category = props => {
    return (
      <div>
        <Settings user={props.user} setuser={props.setuser}/>
        <ProductDisplay user={props.user} />
        <Navbar user={props.user} />
      </div>
    )
}
  
export default Category