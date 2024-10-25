import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbManualGearboxFilled, TbAirConditioning } from "react-icons/tb";
import './CarList.css';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category,setCategory]=useState('all')

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cars');
                const cars = response.data
                if(category==='all'){
                  setCars(cars);
                }else{
                  const carbyCategory = cars.filter(car => car.body_type===category);
                  setCars(carbyCategory);
                }
                
                console.log(response.data);
            } catch (err) {
                setError('Error fetching cars. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [category]);

    const handleCarClick = (carId) => {
        localStorage.setItem('carId', carId);
    };

    const handleCategory = (cat)=>{
      setCategory(cat)
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="carlist-container">
        <h1 className="carlist-title">Select a vehicle group</h1>
        <Link to='/admin/car/add'>Add Car Page</Link>
        <div className="carlist-filter-buttons">
          <button className="carlist-filter" onClick={()=>handleCategory('all')}>All vehicles</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Sedan')}>Sedan</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Hatchback')}>Hatchback</button>
          <button className="carlist-filter" onClick={()=>handleCategory('SUV')}>SUV</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Crossover')}>Crossover</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Coupe')}>Coupe</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Convertible')}>Convertible</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Pickup Truck')}>Pickup Truck</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Station Wagon')}>Station Wagon</button>
          <button className="carlist-filter" onClick={()=>handleCategory('Luxury Car')}>Luxury Car</button>
        </div>

        <div className="carlist-car-list">
            {cars.map((car) => (
              <Link style={{ textDecoration: 'none' }} key={car._id} to={`/admin/car/detail`} onClick={() => handleCarClick(car._id)}>
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
                  <button className="carlist-button-check">View Details</button>
                </div>
              </Link>
            ))}
          </div>
      </div>
    );
};

export default CarList;
