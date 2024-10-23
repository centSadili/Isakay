import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchCar.css';
import { Link, useNavigate } from 'react-router-dom';

const SearchCar = () => {
  const [searched, setSearch] = useState([]);

  const pickup = localStorage.getItem('pickup');
  const dropoff = localStorage.getItem('dropoff');
  const daysAvailability = localStorage.getItem('daysAvailability');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const url = 'http://localhost:3000/api/car/cars';
        const response = await axios.get(url, {
          params: {
            pickup: pickup,
            dropoff: dropoff,
            days_availability: daysAvailability,
          },
        });

        if (response.data.cars.length > 0) {
          const searchedcars = response.data.cars;
          setSearch(searchedcars);
        } else {
          console.error('No cars found for the selected criteria.');
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    fetchCar();
  }, [pickup, dropoff, daysAvailability]);

  const handleCarClick = (carId) => {
    localStorage.setItem('carId', carId);
  };

  return (
    <div className="searchcontainer">
      <div className="cars-header">
        <a href='#'>
          <img src="https://cdn-icons-png.flaticon.com/128/3085/3085411.png" alt="Logo Image" className="logo-img"></img>
        </a>
        <a href='#' className="logo">Isakay</a>
        <nav className="navbar"> 
           <a href='#'>Home</a>
           <a href='#'>Vehicles</a>
           <a href='#'>About</a>
           <a href='#'>Contact Us</a>
        </nav>
      </div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>Car Listings</h1>
      <div className="car-list-custom">
        {searched.map((car) => (
          <Link style={{ textDecoration: 'none' }}
            key={car._id}
            to={`/carpage`}
            onClick={() => handleCarClick(car._id)}
          >
            <div className="car-card-custom">
              <img
                src={`http://localhost:3000/api/car_img/${car.image}`}
                alt={car.car_name}
                style={{ width: '250px', height: '150px' }}
              />
              <div className="car-info-custom">
                <h2>{car.car_name}</h2>
                <p>Seats: {car.seats}</p>
                <p>Transmission: {car.transmission}</p>
                <p>Pickup: {car.pickup}</p>
                <p>Dropoff: {car.dropoff}</p>
                <p className="car-price-custom">${car.price}</p>
                <div className="important-info-custom">
                  <button className="button-check-custom">Check out the deal!</button>
                </div>
              </div>
              <div className="separator-custom"></div>
              <div className="review-section-custom">
                <p className="rating-custom">8.2</p>
                <p>1000+ reviews</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchCar;
