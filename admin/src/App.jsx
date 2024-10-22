import {Router,Route,Routes,Navigate} from 'react-router-dom'
import LogIn from './Components/Login/LogIn'
import AddCar from './Components/Car/AddCar/AddCar'
import Home from './Components/Home/Home'
import CarList from './Components/Car/CarList/CarList'
import CarPage from './Components/Car/CarPage/CarPage'
import UpdateCar from './Components/Car/UpdateCar/UpdateCar'
import Userlist from './Components/User/Userlist/Userlist'
import Profile from './Components/User/UsersProfile/Profile'

function App() {
  
  return (
    <>
     <Routes>
     <Route path='/Home' exact element={<Home/>}/>
     <Route path='/login' exact element={<LogIn/>}/>
     <Route path='/admin/car/add' exact element={<AddCar/>}/>
     <Route path='/admin/car/list' exact element={<CarList/>}/>
     <Route path='/admin/car/detail' exact element={<CarPage/>}/>
     <Route path='/admin/car/detail/update/' exact element={<UpdateCar/>}/>
     
     <Route path='/admin/user/list' exact element={<Userlist/>}/>
     <Route path='/admin/user/profile' exact element={<Profile/>}/>
     <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
     </Routes>
    </>
  )
}

export default App
