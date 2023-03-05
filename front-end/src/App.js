// import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp' 
import AddArt from './Pages/AddArt'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/AddArt" element={<AddArt />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
