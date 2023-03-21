import React from 'react'
import CategoryDisplay from '../Components/CustomerHomePage/CategoryDisplay'
import Navbar from '../Components/Navbar/Navbar'

const HomeCategories = props => {
  return (
    <div>
      <CategoryDisplay user={props.user} />
      <Navbar user={props.user} />
    </div>
  )
}
  
export default HomeCategories