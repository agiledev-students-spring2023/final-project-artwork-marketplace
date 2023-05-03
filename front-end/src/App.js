// import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import AddArt from './Pages/AddArt'
import Category from './Pages/CategoryPage'
import ViewItem from './Pages/ViewItem'
import ViewCart from './Pages/ViewCart'
import RisingArtist from './Pages/RisingArtists'
import Profile from './Pages/Profile'
import AddCategory from './Pages/AddCategory'
import Followers from './Pages/Followers'
import Analytics from './Pages/Analytics'
import Following from './Pages/Following'
import Followinglist from './Pages/followingList'
import Followerslist from './Pages/followersList'

const App = props => {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const checkUserCredentials = async () => {
      const LSUser = localStorage.getItem("user")
      if (LSUser){
        const userObject = JSON.parse(LSUser)
        try {
          const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${userObject._id}`, {withCredentials: true})
          const user = getUser.data
          localStorage.setItem("user", JSON.stringify(user))
          setUser(user)
        } catch (error) {
          setUser({})
        }
      }
      else{
        setUser({})
      }
    }
    checkUserCredentials()
  }, [])

  return (
    <AnimatePresence mode={'wait'}>
    <BrowserRouter>
      <Routes>
          {/* Pre-Login Routes */}
          {!user.user && (
            <>
              <Route path="/" element={<Home user={user} setuser={setUser}/>}/>
              <Route path="/Login" element={<Login user={user} setuser={setUser}/>}/>
              <Route path="/SignUp" element={<SignUp user={user} setuser={setUser}/>}/>
              <Route path="/AboutUs" element={<AboutUs user={user} setuser={setUser}/>}/>
            </>
          )}
          {/* Post-Login Routes */}
          {user.user &&(
            <>
              {/* ARTIST EXCLUSIVE USER ROUTES */}
              {user.user === "artist" &&(
                <>
                  <Route path="/" element={<Home user={user} setuser={setUser}/>}/>
                  <Route path="/AddArt" element={<AddArt user={user} setuser={setUser}/>}/>
                  <Route path="/AddCategory" element={<AddCategory user={user} setuser={setUser}/>}/>
                  <Route path="/Followers" element={<Followers user={user} setuser={setUser}/>}/>
                  <Route path="/Analytics" element={<Analytics user={user} setuser={setUser}/>}/>
                </>
              )}
              {/* CUSTOMER EXCLUSIVE USER ROUTES */}
              {user.user === "customer" &&(
                <>
                  <Route path="/" element={<Home user={user} setuser={setUser}/>}/>
                  <Route path="/Cart" element={<ViewCart user={user} setuser={setUser}/>}/>
                  <Route path="/RisingArtists" element={<RisingArtist user={user} setuser={setUser}/>} />
                  <Route path="/Following" element={<Following user={user} setuser={setUser}/>}/>
                  <Route path="/Category/:categoryID" element={<Category user={user} setuser={setUser}/>}/>
                </>
              )}
              {/* NON-EXCLUSIVE USER ROUTES */}
              <Route path="/Item/:productID" element={<ViewItem user={user} setuser={setUser}/>}/>
              <Route path="/Profile/:userID" element={<Profile user={user} setuser={setUser}/>}/> 
              <Route path="/Profile/Followinglist" element={<Followinglist user={user} setuser={setUser}/>}/> 
              <Route path="/Profile/Followerslist" element={<Followerslist user={user} setuser={setUser}/>}/> 
            </>
          )}
          {/* ANY PATH THAT DOES NOT EXIST --> take user back to "/" (home) */}
          <Route path ='*' element={ <Navigate to ='/' /> } />
          <Route path="/" element={<Home user={user}/>}/>
          <Route path="/Login" element={<Login user={user} setuser={setUser}/>}/>
          <Route path="/SignUp" element={<SignUp user={user}/>}/>
          <Route path="/AboutUs" element={<AboutUs user={user}/>}/>
        
      </Routes>
    </BrowserRouter>
    </AnimatePresence>
  )
}

export default App;