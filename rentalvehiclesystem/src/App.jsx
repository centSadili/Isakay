// import { useState } from 'react'

import AddCar from './Components/Car/AddCar/AddCar'
import CarList from './Components/Car/CarList/CarList'
import Home from './Components/Home/Home'
import LogIn from './Components/Login/LogIn'
import Profile from './Components/User/Profile/Profile'
import SignUp from './Components/User/Signup/SignUp'
import {Router,Route,Routes,Navigate} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  const user =localStorage.getItem('token')
  
  return (
    <>
    <Routes>
      {user && <Route path='/Home' exact element={<Home/>}/>}
      <Route path='/login' exact element={<LogIn/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/profile' exact element={<Profile/>}/>
      <Route path='/addcar' exact element={<AddCar/>}/>
      <Route path='/carlist' exact element={<CarList/>}/>
      <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
    </Routes>
    </>
  )
}

export default App
