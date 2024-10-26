// import { useState } from 'react'


import CarList from './Components/CarList/CarList'
import CarPage from './Components/CarPage/CarPage'
import About from './Components/Home/About'
import Contact from './Components/Home/Contact'
import Home from './Components/Home/Home'
import ForgotPassword from './Components/Login/ForgotPassword'
import LogIn from './Components/Login/LogIn'
import Profile from './Components/Profile/Profile'
import SearchCar from './Components/SearchCar/SearchCar'
import SignUp from './Components/Signup/SignUp'
import {Route,Routes,Navigate} from 'react-router-dom'

function App() {  
  return (
    <>
    <Routes>
      <Route path='/Home' exact element={<Home/>}/>
      <Route path='/contact' exact element={<Contact/>}/>
      <Route path='/about_us' exact element={<About/>}/>
      <Route path='/login' exact element={<LogIn/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/profile' exact element={<Profile/>}/>
      <Route path='/vehicles' exact element={<CarList/>}/>
      <Route path='/search' exact element={<SearchCar/>}/>
      <Route path='/carpage' exact element={<CarPage/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
    </Routes>
    </>
  )
}

export default App
