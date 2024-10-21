import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import RentalForm from '../RentalForm/RentalForm';
const CarPage = () => {

    const  id  = localStorage.getItem("carId") || 'ID Not Found' // Get the user ID from the URL
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchCar = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/getcar/${id}`);
            setCar(response.data.car);
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
  return (
    <div>
        <div key={car._id} className="car-card">
                        <img
                            src={`http://localhost:3000/api/car_img/${car.image}`} 
                            alt={car.car_name}
                            style={{ width: '200px', height: 'auto' }} 
                        />
                        <h2>{car.car_name}</h2>
                        <p>Seats: {car.seats}</p>
                        <p>Transmission: {car.transmission}</p>
                        <p>Pickup: {car.pickup}</p>
                        <p>Dropoff: {car.dropoff}</p>
                        <p>Price: ${car.price}</p>
                        <p>Days Available: {car.days_availability}</p>

                    </div>
                    
    </div>
  )
}

export default CarPage
