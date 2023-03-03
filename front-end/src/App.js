// import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutUs from './Pages/AboutUs'
import Login from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AboutUs" element={<AboutUs />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="*" element={<Navigate to='/AboutUs'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
