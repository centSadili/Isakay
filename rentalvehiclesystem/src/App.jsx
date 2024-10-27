// import { useState } from 'react'


import CarList from './Components/CarList/CarList'
import CarPage from './Components/CarPage/CarPage'
import Error500 from './Components/Error Pages/Error500'
import Header from './Components/Header/Header'
import About from './Components/Home/About'
import Contact from './Components/Home/Contact'
import Home from './Components/Home/Home'
import ForgotPassword from './Components/Login/ForgotPassword'
import LogIn from './Components/Login/LogIn'
import Profile from './Components/Profile/Profile'
import SearchCar from './Components/SearchCar/SearchCar'
import SignUp from './Components/Signup/SignUp'
import {Route,Routes,Navigate} from 'react-router-dom'


function PrivateRoute({ children }) {
  const user = localStorage.getItem('id');
  return user ? children : <Navigate to="/error" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about_us' element={<About />} />
        <Route path='/vehicles' element={<CarList />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute><SearchCar /></PrivateRoute>} />
        <Route path='/carpage' element={<PrivateRoute><CarPage /></PrivateRoute>} />

        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/error' element={<Error500 />} />
      </Routes>
    </>
  );
}

export default App;



