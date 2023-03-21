import React from 'react'
import Cart from '../Components/Cart/Cart'
import Navbar from '../Components/Navbar/Navbar'

const ViewCart = props => {
  return (
    <div>
        <Cart user={props.user} />
        <Navbar user={props.user} />
    </div>
  )
}

export default ViewCart