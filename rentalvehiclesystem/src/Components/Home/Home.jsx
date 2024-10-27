import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Avatar} from 'antd';
import './Home.css'
import Footer from '../Footer/Footer';



const Home = () => {
  const  id  = localStorage.getItem("id") || 'ID Not Found' // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [cars, setCars] = useState([]);

  const [pickup,setPickup]=useState();
  const [dropoff,setDropoff]=useState();
  const [daysAvailability, setDaysAvailability] = useState(); 

  const navigate = useNavigate()
  // Retrieve token if using authentication
  const token = localStorage.getItem('token');
  //getcars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cars'); // Adjust URL based on your setup
                setCars(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Error fetching cars. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

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
      localStorage.setItem('pickup',pickup)
      localStorage.setItem('dropoff',dropoff)
      localStorage.setItem('daysAvailability',daysAvailability)
      navigate("/search")
    }catch(err){
      
      console.error('Error fetching user:', err);
    }
  }
  

const logOut = () =>{
  localStorage.clear()
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
    <div className='main-container'>
      
      <div className='header'>
        <nav className="navbar">
          <ul>
            <li><Link to ='/about_us'><a href="#about">About</a></Link></li>
            <li><Link to="/vehicles"><a href="#vehicles">Vehicles</a></Link></li>
            <li><a href="#booking">Booking</a></li>
            <li><Link to='/contact'><a href="#contacts">Contacts</a></Link></li>
          </ul>
          <div className="profile">
          <Link to="/profile">
          <div className='prof-container'>
          <div><Avatar size={64} icon={<img src={`http://localhost:3000/api/car_img/${user.image}`} alt="Profile" />} /></div>
          <div className='name'><span>{user.firstName} {user.lastName}
             <br /> 
          <p>New User</p></span>
          <Link to="/login">
          {/* Log out Button Added */}
          <button className='logout' onClick={logOut}>
            <div className="sign"><svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  <div className="text">Logout</div>
  </button>
          </Link>
          </div>
          </div>
            
            </Link>
          
            
          </div>
        </nav>
      </div>


      <div className='home-container'>
      <section className="hero">
          <img src="car-image.jpg" alt="Car" className="hero-image" />
          <div className="booking-form">

            <form onSubmit={handleSubmit}>
            <div className='book-container'>
              <div className="form-group">
            <label htmlFor="pickup">Pick Up Location:</label>
            <input type="text" id="pickup" name="pickup" placeholder="Enter pick-up" onChange={(e)=>setPickup(e.target.value)} required />
            </div>

            {/* Drop Off Location */}
            <div className="form-group">
            <label htmlFor="dropoff">Drop Off Location:</label>
            <input type="text" id="dropoff" name="dropoff" placeholder="Enter drop-off" onChange={(e)=>setDropoff(e.target.value)} required />
            </div>

            {/* Days Availability */}
            <div className="form-group">
            <label htmlFor="days_availability">Days Available:</label>
            <input type="number" id="days_availability" name="days_availability" min="1" max="30" placeholder="Total day of renting" onChange={(e)=>setDaysAvailability(e.target.value)} required /><br />
            </div>
            <div className="form-group" >
            <button className="btn" type='submit'>Book Now</button>
            </div>
              </div>
            </form>

          </div>
          
        </section>

        

        <div className='promo'>
        </div>

        <section className='Features'>
            <div className='all-features'>
              <div>
                <p>
                <svg  viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                Quality and Well-Maintaned Units
                </p>
              </div>


              <div>
                <p>
                <svg fill="#ffffff" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="05 discount tag" id="_05_discount_tag"> <path d="M54.76,24.53l-3.3-5.19a10.005,10.005,0,0,0,1.68-5.35,1.274,1.274,0,0,0,.02-.28,10.21,10.21,0,0,0-20.41-.46l-6.99,3.09a3.986,3.986,0,0,0-1.7,1.4L8.72,39.81a.978.978,0,0,0-.06,1.04,25.789,25.789,0,0,0,7.13,8.47,24.756,24.756,0,0,0,9.9,4.54,1.492,1.492,0,0,0,.21.02.986.986,0,0,0,.85-.49l3.67-6.12v9.68a1,1,0,0,0,.58.91,28.321,28.321,0,0,0,23.88,0,.989.989,0,0,0,.58-.91V26.93A4.448,4.448,0,0,0,54.76,24.53ZM42.94,5.5a8.237,8.237,0,0,1,8.22,8.24.757.757,0,0,0-.01.15,8.223,8.223,0,0,1-.9,3.55l-1.72-2.71a5.6,5.6,0,0,0-4.73-2.59H41.99a5.469,5.469,0,0,0-1.97.37,4.926,4.926,0,0,0-4.66-.41l-.51.23A8.236,8.236,0,0,1,42.94,5.5ZM30.42,27.3V43.39l-5.01,8.35A22.691,22.691,0,0,1,17,47.73a23.7,23.7,0,0,1-6.29-7.29l15-21.56a2.01,2.01,0,0,1,.85-.71l9.61-4.24a2.875,2.875,0,0,1,1.85-.13,4.99,4.99,0,0,0-.83,1.05L31.06,25A4.528,4.528,0,0,0,30.42,27.3ZM53.46,56.31a26.784,26.784,0,0,1-21.04,0V27.3a2.489,2.489,0,0,1,.36-1.27L38.9,15.88a3.634,3.634,0,0,1,3.09-1.74H43.8a3.581,3.581,0,0,1,3.04,1.67l2.18,3.42a8.118,8.118,0,0,1-6.08,2.7,8.38,8.38,0,0,1-1.57-.17,2.463,2.463,0,0,1,2.15-1.29,1,1,0,0,0,0-2,4.455,4.455,0,1,0,0,8.91,1,1,0,0,0,0-2,2.457,2.457,0,0,1-2.3-1.6,10.144,10.144,0,0,0,8.9-2.81l2.96,4.64a2.446,2.446,0,0,1,.38,1.32Z"></path> <path d="M38.33,32.3a3.3,3.3,0,1,0,3.31,3.3A3.3,3.3,0,0,0,38.33,32.3Zm0,4.6a1.3,1.3,0,1,1,1.31-1.3A1.3,1.3,0,0,1,38.33,36.9Z"></path> <path d="M47.55,43.81a3.305,3.305,0,1,0,3.3,3.31A3.312,3.312,0,0,0,47.55,43.81Zm0,4.61a1.305,1.305,0,1,1,1.3-1.3A1.3,1.3,0,0,1,47.55,48.42Z"></path> <path d="M48.693,33.67a1,1,0,0,0-1.406.149L37.043,46.489A1,1,0,0,0,38.6,47.747l10.244-12.67A1,1,0,0,0,48.693,33.67Z"></path> <path d="M23.479,41.225a1,1,0,1,0-1.268,1.546l2.934,2.407a.99.99,0,0,0,.632.227,1,1,0,0,0,.635-1.773Z"></path> <path d="M17.586,36.415a1,1,0,0,0-1.313,1.508l2.741,2.386A1,1,0,1,0,20.326,38.8Z"></path> </g> </g></svg>                Transparent Pricing with No Hidden Fees
                </p>
              </div>


              <div>
                <p>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M11.9976 12.7119C11.2978 11.9328 10.1309 11.7232 9.25414 12.4367C8.37738 13.1501 8.25394 14.343 8.94247 15.1868C9.33119 15.6632 10.2548 16.4983 10.9854 17.1353C11.3319 17.4374 11.5051 17.5885 11.7147 17.6503C11.8934 17.703 12.1018 17.703 12.2805 17.6503C12.4901 17.5885 12.6633 17.4374 13.0098 17.1353C13.7404 16.4983 14.664 15.6632 15.0527 15.1868C15.7413 14.343 15.6329 13.1426 14.7411 12.4367C13.8492 11.7307 12.6974 11.9328 11.9976 12.7119ZM6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                Seamless Online Booking System
                </p>
              </div>

              
            </div>
        </section>

        <section className='Fleet'>
          <h1>OUR FLEET <span>Check out some of our quality cars for you to enjoy</span></h1> 

          <div className='slider'>
          <div className='slider'>
            {cars.map((car) => (
              <div className='slider-cards' key={car._id}>
                <img src={`http://localhost:3000/api/car_img/${car.image}`} alt={car.car_name} />
              </div>
            ))}
          </div>
          
           
          </div>
        </section>

        <Footer/>
      </div>
        
    </div>
  )
}

export default Home