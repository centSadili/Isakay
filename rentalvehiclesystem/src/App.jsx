// import { useState } from 'react'

import Home from './Components/Home/Home'
import LogIn from './Components/Login/LogIn'
import SignUp from './Components/Signup/SignUp'
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
      <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
    </Routes>
    </>
  )
}

export default App
