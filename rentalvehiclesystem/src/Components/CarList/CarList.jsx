import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbManualGearboxFilled, TbAirConditioning } from "react-icons/tb";
import './CarList.css';
import { Link, useNavigate } from 'react-router-dom';
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleCarClick = (carId) => {
        localStorage.setItem('carId', carId);
      };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div>
      <h1>Select a vehicle group</h1>
    
      <div class="filter-buttons">
        <button class="filter">All vehicles</button>
        <button class="filter">Sedan</button>
        <button class="filter">Cabriolet</button>
        <button class="filter">Pickup</button>
        <button class="filter">SUV</button>
        <button class="filter">Minivan</button>
      </div>
    
      <div class="car-list">
        {cars.map((car) => (
          <Link key={car._id} to={`/carpage`} onClick={() => handleCarClick(car._id)}>
            <div class="car-card">
              <img src={`http://localhost:3000/api/car_img/${car.image}`} alt={car.car_name} />
              <div class="car-info">
                <h2>{car.car_name}</h2>
                <p class="car-type">{car.type}</p>
                <p class="car-price">${car.price} per day</p>
    
                <div class="car-details">
                  <p class="icon1">
                    <TbManualGearboxFilled />
                    {car.transmission}
                  </p>
                  <p>
                    <TbAirConditioning />
                    Air Conditioner
                  </p>
                </div>
    
                <button class="button-check">View Details</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    

      
      

    );
};

export default CarList;
