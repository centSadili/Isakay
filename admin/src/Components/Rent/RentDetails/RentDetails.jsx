import React, { useState ,useEffect, useRef} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import RentalForm from '../RentalForm/RentalForm';
import './RentalDetails.css'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Head from '../../Head';
const RentalDetails = () => {

    const  id  = localStorage.getItem("carId") || 'ID Not Found' // Get the user ID from the URL
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showRentalForm, setShowRentalForm] = useState(false); 
    useEffect(() => {
        const fetchCar = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/getcar/${id}`);
            setCar(response.data.car);
            localStorage.setItem('price',response.data.car.price)
            setLoading(false);
          } catch (err) {
            console.error('Error fetching user:', err);
            setError(true);
            setLoading(false);
          }
        };
    
        fetchCar();
      }, [id]);

      if (loading) {
        return <div>Loading user details...</div>;
      }
    
      if (error ) {
        return (
        <div>
          <h1>Car not Found</h1> 
        </div>
        );
      }
      const handleBookNow = () => {
        setShowRentalForm(true); // Show the RentalForm
      };
  return (
    <div className="cars-page-container">
      <Head title="Vehicle Details"/>
      <Header/>
        <div className="car-page-container"> 
      <div key={car._id} className="car-page-card" >
        <div className="card-page-custom">
          <img
          className="picholdings"
            src={`http://localhost:3000/api/car_img/${car.image}`}
            alt={car.car_name}
          />

          <div className="car-page-info">
            <h2>{car.car_name}</h2>
            <p>Seats: {car.seats}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Pickup: {car.pickup}</p>
            <p>Dropoff: {car.dropoff}</p>
            <p>Days Available: {car.days_availability}</p>
            <p className="carpage-price-custom">${car.price}</p>
            <div className="important-carpage-custom">
              <button className="button-carpage-custom" onClick={handleBookNow}>
                Book Now!
              </button>
              </div>
            </div>
            <div className="separatorcarpage-custom"></div>
            <p className="ratings-carpage">  8.2</p>
            <div className="review-carpage-custom">
              <p className="review">1000+ reviews</p>
            </div>
         
        </div>
      </div>
      <div className="cardform">
      {showRentalForm && <RentalForm />} 
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default RentalDetails
