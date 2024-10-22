// import { useState } from 'react'


import CarList from './Components/CarList/CarList'
import CarPage from './Components/CarPage/CarPage'
import Home from './Components/Home/Home'
import LogIn from './Components/Login/LogIn'
import Profile from './Components/Profile/Profile'
import SearchCar from './Components/SearchCar/SearchCar'
import SignUp from './Components/Signup/SignUp'
import {Router,Route,Routes,Navigate} from 'react-router-dom'

function App() {  
  return (
    <>
    <Routes>
      <Route path='/Home' exact element={<Home/>}/>
      <Route path='/login' exact element={<LogIn/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/profile' exact element={<Profile/>}/>
      <Route path='/vehicles' exact element={<CarList/>}/>
      <Route path='/search' exact element={<SearchCar/>}/>
      <Route path='/carpage' exact element={<CarPage/>}/>
      <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
    </Routes>
    </>
  )
}

export default App
