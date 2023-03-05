// import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import ArtistHome from './Pages/ArtistHome'
import Landing from './Pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Home" element={<ArtistHome />}/>
        <Route path="/Landing" element={<Landing />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;