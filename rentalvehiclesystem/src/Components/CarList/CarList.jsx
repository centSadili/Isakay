import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbManualGearboxFilled, TbAirConditioning } from "react-icons/tb";
import './CarList.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

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

      <div className="carlist-main-container">
        <div className="carlist-header">
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
         <div className="carlists-container">
        <h1 className="carlist-title">Select a vehicle group</h1>

        <div className="carlist-filter-buttons">
          <button className="carlist-filter">All vehicles</button>
          <button className="carlist-filter">Sedan</button>
          <button className="carlist-filter">Cabriolet</button>
          <button className="carlist-filter">Pickup</button>
          <button className="carlist-filter">SUV</button>
          <button className="carlist-filter">Minivan</button>
        </div>

        <div className="carlist-car-list">
            {cars.map((car) => (
              <Link 
                style={{ textDecoration: 'none' }} 
                key={car._id} 
                to={car.status ? `/carpage` : '#'} 
                onClick={() => car.status && handleCarClick(car._id)}
              >
                <div className={`carlist-car-card ${!car.status ? 'carlist-car-unavailable' : ''}`}>
                  <div className="picholder">
                    <img src={`http://localhost:3000/api/car_img/${car.image}`} alt={car.car_name} className="carlist-car-img" />
                  </div>
                  <div className="carlist-car-info">
                    <h2 className="carlist-car-name">{car.car_name}</h2>
                    <p className="carlist-car-type">{car.type}</p>
                    <p className="carlist-car-price">${car.price} per day</p>

                    <div className="carlist-car-details">
                      <p className="carlist-icon1">
                        <TbManualGearboxFilled />
                        {car.transmission}
                      </p>
                      <p>
                        <TbAirConditioning />
                        Air Conditioner
                      </p>
                    </div>
                  </div>
                  <button className="carlist-button-check">
                    {car.status ? 'View Details' : 'Car Not Available'}
                  </button>
                </div>
              </Link>
            ))}
          </div>
      </div>
          

          <Footer/>
      </div>
     
    );
};

export default CarList;
