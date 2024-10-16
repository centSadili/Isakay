import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Car Listings</h1>
            <div className="car-list">
                {cars.map(car => (
                    <div key={car._id} className="car-card">
                        <img
                            src={`http://localhost:3000/api/car_img/${car.image}`} // Adjust the image URL based on your backend route
                            alt={car.car_name}
                            style={{ width: '200px', height: 'auto' }} // Add styles as needed
                        />
                        <h2>{car.car_name}</h2>
                        <p>Seats: {car.seats}</p>
                        <p>Transmission: {car.transmission}</p>
                        <p>Pickup: {car.pickup}</p>
                        <p>Dropoff: {car.dropoff}</p>
                        <p>Price: ${car.price}</p>
                        <p>Days Available: {car.days_availability}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarList;
