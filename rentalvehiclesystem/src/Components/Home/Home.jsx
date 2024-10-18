import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Home.css'
import Footer from '../Footer/Footer';


const Home = () => {
  const  id  = localStorage.getItem("id") || 'ID Not Found' // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  
  const [pickup,setPickup]=useState();
  const [dropoff,setDropoff]=useState();
  const [daysAvailability, setDaysAvailability] = useState(); 

  const navigate = useNavigate()
  // Retrieve token if using authentication
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            // Include the token in headers if required
            Authorization: token ? `Bearer ${token}` : '',
          },
        };

        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const url = 'http://localhost:3000/api/car/cars'
      const response = await axios.get(url,{
        params:{
          pickup:pickup,
          dropoff:dropoff,
          days_availability: daysAvailability

        }}
      )
      if (response.data.cars.length > 0) {
        console.log(response.data.cars)
        const searchedcars = response.data.cars
        localStorage.setItem("searchedcars", searchedcars);
        
        navigate("/search")
      } else {
        setError('No cars found for the selected criteria.');
      }
    }catch(err){
      
      console.error('Error fetching user:', err);
    }
  }
  

const logOut = () =>{
  localStorage.setItem("id",null) 
  localStorage.setItem("token", null);
  setUser(null)
}

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error || !user) {
    return (
    <div>
      <h1>Please Log in First</h1> 
      <Link to="/login">
          {/* Log in Button Added */}
          <button>Log in</button>
      </Link>
    </div>
    );
  }
  return (
    <div>

      <header>
        <nav className="navbar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#vehicles">Vehicles</a></li>
            <li><a href="#booking">Booking</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
          <div className="profile">
          <Link to="/profile">
            <img src="https://via.placeholder.com/50" alt="Profile" />
            <span>{user.firstName} {user.lastName}</span>
            </Link>
            <p>New User</p>
          <Link to="/login">
          {/* Log out Button Added */}
          <button onClick={logOut}>Log out</button>
          </Link>
            
          </div>
        </nav>
      </header>
        <section className="hero">
          <img src="car-image.jpg" alt="Car" className="hero-image" />
          <div className="booking-form">

            <form onSubmit={handleSubmit}>
             {/* Pick Up Location */}
             <div className="form-group">
            <label htmlFor="pickup">Pick Up Location:</label>
            <input type="text" id="pickup" name="pickup" onChange={(e)=>setPickup(e.target.value)} required />
            </div>

            {/* Drop Off Location */}
            <div className="form-group">
            <label htmlFor="dropoff">Drop Off Location:</label>
            <input type="text" id="dropoff" name="dropoff" onChange={(e)=>setDropoff(e.target.value)} required />
            </div>

            {/* Days Availability */}
            <div className="form-group">
            <label htmlFor="days_availability">Days Available:</label>
            <input type="number" id="days_availability" name="days_availability" placeholder="Enter the number of available days (e.g., 5)" onChange={(e)=>setDaysAvailability(e.target.value)} required /><br />
            </div>
            <button className="btn" type='submit'>Book Now</button>
            </form>

          </div>
          
        </section>
        <Footer/>
    </div>
  )
}

export default Home
