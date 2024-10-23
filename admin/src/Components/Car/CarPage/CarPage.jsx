import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import UpdateCar from '../UpdateCar/UpdateCar';
const CarPage = () => {

    const  id  = localStorage.getItem("carId") || 'ID Not Found' // Get the user ID from the URL
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
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

      const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axios.delete(`http://localhost:3000/api/deletecar/${id}`);
                alert('Car deleted successfully');
                navigate('/admin/car/list'); // Navigate back to the cars list or another page
            } catch (err) {
                console.error('Error deleting car:', err);
                alert('Error deleting car');
            }
        }
    };

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
                     
                  <Link to ={`/admin/car/detail/update/`}>
                  <button>Update</button>
                  </Link>    
                      
                        
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                   
                 
                    
    </div>
  )
}

export default CarPage
