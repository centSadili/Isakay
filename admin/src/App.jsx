import {Router,Route,Routes,Navigate} from 'react-router-dom'
import LogIn from './Components/Login/LogIn'
import AddCar from './Components/Car/AddCar/AddCar'
import Home from './Components/Home/Home'
import CarList from './Components/Car/CarList/CarList'
import CarPage from './Components/Car/CarPage/CarPage'
import UpdateCar from './Components/Car/UpdateCar/UpdateCar'
import Userlist from './Components/User/Userlist/Userlist'
import Profile from './Components/User/UsersProfile/Profile'
import SignUp from './Components/User/Signup/SignUp'
import Rentlist from './Components/Rent/Rentlist/Rentlist'
import SearchCar from './Components/Rent/SearchCar/SearchCar'
import AddRent from './Components/Rent/AddRent/AddRent'
import RentalDetails from './Components/Rent/RentDetails/RentDetails'
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile'
import Adminlist from './Components/Admin/Adminlist/Adminlist'

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
     <Route path='/admin/user/add' exact element={<SignUp/>}/>
    
     <Route path='/admin/profile' exact element={<AdminProfile/>}/>
     <Route path='/admin/list' exact element={<Adminlist/>}/>
     <Route path='/admin/rent/list' exact element={<Rentlist/>}/>
     <Route path='/admin/rent/add' exact element={<AddRent/>}/>
     <Route path='/admin/search/rent' exact element={<SearchCar/>}/>
     <Route path='/admin/rent/details' exact element={<RentalDetails/>}/>
     <Route path='/admin/rent/form' exact element={<SearchCar/>}/>
     <Route path ='/' exact element={<Navigate replace to='/login'/>}/>
     </Routes>
    </>
  )
}

export default App
