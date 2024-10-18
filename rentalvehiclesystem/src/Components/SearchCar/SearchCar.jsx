import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
const SearchCar = () => {
const [searched,setSearch]=useState([])

const pickup = localStorage.getItem('pickup')
const dropoff = localStorage.getItem('dropoff')
const daysAvailability = localStorage.getItem('daysAvailability')

const navigate = useNavigate()
useEffect(() => {
    const fetchUser = async ()=>{
        
    
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
            
            setSearch(searchedcars);
            console.log([searched])
           
          } else {
            setError('No cars found for the selected criteria.');
          }
        }catch(err){
          
          console.error('Error fetching user:', err);
        }
      }
      fetchUser();
    }, [pickup, dropoff,daysAvailability]);
  return (
    <div>
      <div className="car-list">
                {searched.map(car => (
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

                        <button>Book</button>
                    </div>
                ))}
            </div>
         
    </div>
  )
}

export default SearchCar
