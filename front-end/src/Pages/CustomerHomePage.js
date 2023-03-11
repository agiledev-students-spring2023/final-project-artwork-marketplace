import React from 'react'
import SearchBar from '../Components/CustomerHomePage/SearchBar'
import TopPicks from '../Components/CustomerHomePage/TopPicks'
import CategoryDisplay from '../Components/CustomerHomePage/CategoryDisplay'
import ShopperNavbar from '../Components/Navbar/ShopperNavbar'

const HomeCategories = () => {
    return (
      <div>
        <SearchBar/>
        <TopPicks/>
        <CategoryDisplay/>
        <ShopperNavbar/>
      </div>
    )
}
  
export default HomeCategories