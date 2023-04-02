// import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import AddArt from './Pages/AddArt'
import Category from './Pages/CategoryPage'
import ViewItem from './Pages/ViewItem'
import ViewCart from './Pages/ViewCart'
import RisingArtist from './Pages/RisingArtist'
import Profile from './Pages/Profile'


const App = props => {
  const [user, setUser] = useState(
  {
    "_id": 1,
    "user": "Artist",
    "name": {
      "first": "Curry",
      "last": "Romney",
      "full": "Curry Romney"
    },
    "email": "artist1@artist.com",
    "password": "$2b$10$dqfbi162SmJAB6NNlyelZuB8Mu.pX4NV6ldCgKMbNunHoWHERTMuu",
    "products_uploaded": [
        7,
        10,
        15
    ],
    "cart": [
    ],
    "saved": [
    ],
    "following" : [
    ],
    "followers" : [
    ]
  }
  )
  return (
    <BrowserRouter>
      <Routes>
        {/* Pre-Login Routes */}
        {!user.user && (
          <>
            <Route path="/" element={<Home user={user}/>}/>
            <Route path="/Login" element={<Login user={user} setuser={setUser} />}/>
            <Route path="/SignUp" element={<SignUp user={user} />}/>
            <Route path="/AboutUs" element={<AboutUs user={user} />}/>
          </>
        )}
        {/* Post-Login Routes */}
        {user.user &&(
          <>
            {/* ARTIST EXCLUSIVE USER ROUTES */}
            {user.user === "Artist" &&(
              <>
                <Route path="/" element={<Home user={user} setuser={setUser} />}/>
                <Route path="/AddArt" element={<AddArt user={user} setuser={setUser} />}/>
              </>
            )}
            {/* CUSTOMER EXCLUSIVE USER ROUTES */}
            {user.user === "Customer" &&(
              <>
                <Route path="/" element={<Home user={user} setuser={setUser} />}/>
                <Route path="/Cart" element={<ViewCart user={user} setuser={setUser} />}/>
                <Route path="/RisingArtists" element={<RisingArtist user={user} setuser={setUser} />} />
                <Route path="/Category/:categoryID" element={<Category user={user} setuser={setUser} />}/>
              </>
            )}
            {/* NON-EXCLUSIVE USER ROUTES */}
            <Route path="/Item/:productID" element={<ViewItem user={user} setuser={setUser} />}/>
            <Route path="/Profile/:userID" element={<Profile user={user} setuser={setUser} />}/> 
          </>
        )}
        {/* ANY PATH THAT DOES NOT EXIST --> take user back to "/" (home) */}
        <Route path ='*' element={ <Navigate to ='/' /> } />
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/Login" element={<Login user={user} setuser={setUser} />}/>
        <Route path="/SignUp" element={<SignUp user={user} />}/>
        <Route path="/AboutUs" element={<AboutUs user={user} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;