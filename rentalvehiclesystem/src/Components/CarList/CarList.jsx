import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbManualGearboxFilled, TbAirConditioning } from "react-icons/tb";
import './CarList.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Head from '../Head';

const CarList = () => {
    const [activeFilter, setActiveFilter] = useState('');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cars');
                const cars = response.data;
                if (category === 'all') {
                    setCars(cars);
                } else {
                    const carByCategory = cars.filter(car => car.body_type === category);
                    setCars(carByCategory);
                }
            } catch (err) {
                setError('Error fetching cars. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [category]);

    const handleCategory = (cat) => {
        setCategory(cat);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="carlist-main-container">
            <Head title="List of Cars"/>
           <Header/>

            <div className="carlists-container">
                <h1 className="carlist-title">Select a vehicle group</h1>

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

                <div className="carlist-car-list">
                    {cars.map((car) => (
                        <Link
                            style={{ textDecoration: 'none' }}
                            key={car._id}
                            to={car.status ? `/carpage` : '#'}
                            onClick={() => car.status && localStorage.setItem('carId', car._id)}
                        >
                            <div className={`carlist-car-card ${!car.status ? 'carlist-car-unavailable' : ''}`}>
                                <div className="picholder">
                                    <img src={`http://localhost:3000/api/car_img/${car.image}`} alt={car.car_name} className="carlist-car-img" />
                                </div>
                                <div className="carlist-car-info">
                                    <h2 className="carlist-car-name">{car.car_name}</h2>
                                    
                                    <p className="carlist-car-price">PHP {car.price}</p>

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

            <Footer />
        </div>
    );
};

export default CarList;
