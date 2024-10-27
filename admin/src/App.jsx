import { Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './Components/Login/LogIn';
import AddCar from './Components/Car/AddCar/AddCar';
import Home from './Components/Home/Home';
import CarList from './Components/Car/CarList/CarList';
import CarPage from './Components/Car/CarPage/CarPage';
import UpdateCar from './Components/Car/UpdateCar/UpdateCar';
import Userlist from './Components/User/Userlist/Userlist';
import Profile from './Components/User/UsersProfile/Profile';
import SignUp from './Components/User/Signup/SignUp';
import Rentlist from './Components/Rent/Rentlist/Rentlist';
import SearchCar from './Components/Rent/SearchCar/SearchCar';
import AddRent from './Components/Rent/AddRent/AddRent';
import RentalDetails from './Components/Rent/RentDetails/RentDetails';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile';
import Adminlist from './Components/Admin/Adminlist/Adminlist';
import Error500 from './Components/Error Pages/Error500';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('id');
  console.log(user)
  return user && user !== 'null' ? children : <Navigate to="/error" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/admin/car/add' element={<PrivateRoute><AddCar /></PrivateRoute>} />
        <Route path='/admin/car/list' element={<PrivateRoute><CarList /></PrivateRoute>} />
        <Route path='/admin/car/detail' element={<PrivateRoute><CarPage /></PrivateRoute>} />
        <Route path='/admin/car/detail/update' element={<PrivateRoute><UpdateCar /></PrivateRoute>} />
        
        <Route path='/admin/user/list' element={<PrivateRoute><Userlist /></PrivateRoute>} />
        <Route path='/admin/user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/admin/user/add' element={<PrivateRoute><SignUp /></PrivateRoute>} />
        
        <Route path='/admin/profile' element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
        <Route path='/admin/list' element={<PrivateRoute><Adminlist /></PrivateRoute>} />
        <Route path='/admin/rent/list' element={<PrivateRoute><Rentlist /></PrivateRoute>} />
        <Route path='/admin/rent/add' element={<PrivateRoute><AddRent /></PrivateRoute>} />
        <Route path='/admin/search/rent' element={<PrivateRoute><SearchCar /></PrivateRoute>} />
        <Route path='/admin/rent/details' element={<PrivateRoute><RentalDetails /></PrivateRoute>} />
        <Route path='/admin/rent/form' element={<PrivateRoute><SearchCar /></PrivateRoute>} />

        <Route path='/error' element={<Error500 />} />
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </>
  );
}

export default App;
