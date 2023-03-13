// import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import ArtistHome from './Pages/ArtistHome'
import Landing from './Pages/Landing'
import AddArt from './Pages/AddArt'
import HomeCategories from './Pages/CustomerHomePage'
import Category from './Pages/CategoryPage'
import ViewItem from './Pages/ViewItem'


function App() {
  const [user, setUser] = useState({})
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Home" element={<ArtistHome />}/>
        <Route path="/Landing" element={<Landing />}/>
        <Route path="/AddArt" element={<AddArt />}/>
        <Route path="/CustomerHome" element={<HomeCategories />}/>
        <Route path="/Category/:categoryID" element={<Category/>}/>
        <Route path="/ViewItem/:productId" element={<ViewItem />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;