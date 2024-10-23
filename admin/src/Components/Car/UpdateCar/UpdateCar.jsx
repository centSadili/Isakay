import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCar = () => {
  const  id  = localStorage.getItem("carId") || 'ID Not Found' 

  // Seat options based on body type
  const seatOptions = {
    Sedan: 5,
    Hatchback: 5,
    SUV: 7,
    Crossover: 5,
    Coupe: 4,
    Convertible: 4,
    'Pickup Truck': 5,
    'Station Wagon': 5,
    'Luxury Car': 5,
  };

  // Base price per day for each body type
  const basePricePerDay = {
    Sedan: 50,
    Hatchback: 40,
    SUV: 80,
    Crossover: 60,
    Coupe: 70,
    Convertible: 90,
    'Pickup Truck': 75,
    'Station Wagon': 65,
    'Luxury Car': 120,
  };

  const [formData, setFormData] = useState({
    car_name: '',
    body_type: '',
    seats: seatOptions[''],
    status:'',
    transmission: 'manual',
    pickup: '',
    dropoff: '',
    price: '',
    days_availability: '',
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing car details to populate the form
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:3000/api/getcar/${id}`);
        const car = response.data.car;
        console.log('Fetched car body type:', car);
        // Populate form with existing car data
        setFormData({
          car_name: car.car_name,
          body_type: car.body_type,
          seats: car.seats,
          status: car.status,
          transmission: car.transmission,
          pickup: car.pickup,
          dropoff: car.dropoff,
          price: car.price,
          days_availability: car.days_availability,
          image: null, // No need to prefill image
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] }); // Handle file input
    } else {
      const updatedFormData = { ...formData, [name]: value };

      if (name === 'status') {
        updatedFormData.status = value === 'Available' ? true : false;  // Set boolean value for status
      }
      // Automatically update seats based on body type
      if (name === 'body_type') {
        const seats = seatOptions[value] || '';
        updatedFormData.seats = seats;
      }

      // Automatically compute price based on body type and days availability
      if (name === 'body_type' || name === 'days_availability') {
        const days = updatedFormData.days_availability || 0;
        const basePrice = basePricePerDay[updatedFormData.body_type] || 0;
        const price = basePrice * days;
        updatedFormData.price = price || '';
      }

      setFormData(updatedFormData); // Update formData with calculated values
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.put(`http://localhost:3000/api/updatecar/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message); // Notify user on success
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Error updating car listing.'); // Notify user on error
      } else {
        console.log(error)
        alert('An error occurred. Please try again.');
      }
    }
  };

  // Inline styles (same as in the AddCar component)
  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={formContainerStyle}>
      <h2>Update Car Listing</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Name */}
        <label htmlFor="car_name">Car Name:</label><br />
        <input type="text" id="car_name" name="car_name" value={formData.car_name} onChange={handleChange} required />

{/* Body Type */}
<label htmlFor="body_type">Body Type:</label><br />
<select 
  id="body_type" 
  name="body_type" 
  value={formData.body_type || 'Sedan'} // This should correctly reflect the car's body type
  onChange={handleChange} 
  required
>
  {Object.keys(seatOptions).map((type) => (
    <option key={type} value={type}>{type}</option>
  ))}
</select><br />

        {/* Seats */}
        <label htmlFor="seats">Seats:</label><br />
        <input type="number" id="seats" name="seats" min="1" value={formData.seats} onChange={handleChange} readOnly required />

        {/* Image */}
        <label htmlFor="image">Car Image (Optional):</label><br />
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />

        {/* Transmission */}
        <label htmlFor="transmission">Transmission:</label><br />
        <select id="transmission" name="transmission" value={formData.transmission || 'manual'} onChange={handleChange} required>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select><br />
        {/* Status */}
        <label htmlFor="status">Status:</label><br />
        <select id="status" name="status"  value={formData.status === true ? 'Available' : 'Rented'} onChange={handleChange} required>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select><br />

        {/* Pick Up Location */}
        <label htmlFor="pickup">Pick Up Location:</label><br />
        <input type="text" id="pickup" name="pickup" value={formData.pickup} onChange={handleChange} required />

        {/* Drop Off Location */}
        <label htmlFor="dropoff">Drop Off Location:</label><br />
        <input type="text" id="dropoff" name="dropoff" value={formData.dropoff} onChange={handleChange} required />

        {/* Days Availability */}
        <label htmlFor="days_availability">Days Available:</label><br />
        <input type="number" id="days_availability" name="days_availability" min="0" placeholder="Enter available days" value={formData.days_availability} onChange={handleChange} required />

        {/* Price */}
        <label htmlFor="price">Price (in $):</label><br />
        <input type="hidden" id="price" name="price" step="1" min="0" value={formData.price} onChange={handleChange} readOnly required />
        <h1>{formData.price}</h1>

        {/* Submit Button */}
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateCar;
