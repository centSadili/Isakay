import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchCar.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer';
import Head from '../../Head';

const SearchCar = () => {
  const [searched, setSearch] = useState([]);

  const pickup = localStorage.getItem('pickup');
  const dropoff = localStorage.getItem('dropoff');
  const daysAvailability = localStorage.getItem('daysAvailability');

  const [category, setCategory] = useState('all');
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
          if (category === 'all') {
            setSearch(searchedcars);
        } else {
            const carByCategory = searchedcars.filter(car => car.body_type === category);
            setSearch(carByCategory);
        }
        } else {
          console.error('No cars found for the selected criteria.');
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    fetchCar();
  }, [pickup, dropoff, daysAvailability,category]);
  const handleCategory = (cat) => {
    setCategory(cat);
};
  const handleCarClick = (carId) => {
    localStorage.setItem('carId', carId);
  };

  return (
    <div className="searchcontainer">
      <Head title="Search Vehicle"/>
      <Header/>
      <div className="search-container">
      <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>Car Listings</h1>
      <div className="carlist-filter-buttons">
                    <button
                        className={`carlist-filter ${category === 'all' ? 'active' : ''}`}
                        onClick={() => handleCategory('all')}
                    >
                        All vehicles
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Sedan' ? 'active' : ''}`}
                        onClick={() => handleCategory('Sedan')}
                    >
                        Sedan
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Hatchback' ? 'active' : ''}`}
                        onClick={() => handleCategory('Hatchback')}
                    >
                        Hatchback
                    </button>
                    <button
                        className={`carlist-filter ${category === 'SUV' ? 'active' : ''}`}
                        onClick={() => handleCategory('SUV')}
                    >
                        SUV
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Crossover' ? 'active' : ''}`}
                        onClick={() => handleCategory('Crossover')}
                    >
                        Crossover
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Coupe' ? 'active' : ''}`}
                        onClick={() => handleCategory('Coupe')}
                    >
                        Coupe
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Convertible' ? 'active' : ''}`}
                        onClick={() => handleCategory('Convertible')}
                    >
                        Convertible
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Pickup Truck' ? 'active' : ''}`}
                        onClick={() => handleCategory('Pickup Truck')}
                    >
                        Pickup Truck
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Station Wagon' ? 'active' : ''}`}
                        onClick={() => handleCategory('Station Wagon')}
                    >
                        Station Wagon
                    </button>
                    <button
                        className={`carlist-filter ${category === 'Luxury Car' ? 'active' : ''}`}
                        onClick={() => handleCategory('Luxury Car')}
                    >
                        Luxury Car
                    </button>
                </div>
      <div className="car-list-custom">
        {searched.map((car) => (
          <Link style={{ textDecoration: 'none' }}
            key={car._id}
            to={`/admin/rent/details`}
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
      <Footer/>
    </div>
  );
};

export default SearchCar;
