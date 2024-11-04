// import { useState } from 'react'


import AiChatBot from './Components/AiChatBot/AiChatBot'
import CarList from './Components/CarList/CarList'
import CarPage from './Components/CarPage/CarPage'
import Error500 from './Components/Error Pages/Error500'
import About from './Components/Home/About'
import Contact from './Components/Home/Contact'
import Home from './Components/Home/Home'
import ForgotPassword from './Components/Login/ForgotPassword'
import LogIn from './Components/Login/LogIn'
import ResetPassword from './Components/Login/ResetPassword'
import Profile from './Components/Profile/Profile'
import UpdateRentDetailsForm from './Components/RentalForm/UpdateRentDetailsForm'
import SearchCar from './Components/SearchCar/SearchCar'
import SignUp from './Components/Signup/SignUp'
import {Route,Routes,Navigate} from 'react-router-dom'


function PrivateRoute({ children }) {
  const user = localStorage.getItem('id');
  console.log(user)
  return user && user !== 'null' ?  children : <Navigate to="/error" replace />;
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
        <Route path='/update/rent/:id' element={<PrivateRoute><UpdateRentDetailsForm /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute><SearchCar /></PrivateRoute>} />
        <Route path='/carpage' element={<PrivateRoute><CarPage /></PrivateRoute>} />
        <Route path='/forgot-password' exact element={<ForgotPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/aichat' element={<AiChatBot />} />
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/error' element={<Error500 />} />
      </Routes>
      
    </>
  );
}

export default App;



