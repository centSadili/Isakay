import React, { useState } from 'react';
import axios from 'axios';
const AddCar = () => {
  const [formData, setFormData] = useState({
    car_name: '',
    seats: '',
    transmission: 'manual',
    pickup: '',
    dropoff: '',
    price: '',
    days_availability: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/api/car/submit-car', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert(response.data.message); // Notify user on success
      
      // Reset formData to initial state after successful submission
      setFormData({
        car_name: '',
        seats: '',
        transmission: 'manual',
        pickup: '',
        dropoff: '',
        price: '',
        days_availability: '',
        image: null, // Reset the file input
      });
  
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Error adding car listing.'); // Notify user on error
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };
  // Inline styles
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
  return (
    <div style={formContainerStyle}>
      <h2>Car Listing Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Name */}
        <label htmlFor="car_name">Car Name:</label><br />
        <input type="text" id="car_name" name="car_name" value={formData.car_name} onChange={handleChange} required />
        
        {/* Seats */}
        <label htmlFor="seats">Seats:</label><br />
        <input type="number" id="seats" name="seats" min="1" value={formData.seats} onChange={handleChange} required />
        
        {/* Image */}
        <label htmlFor="image">Car Image:</label><br />
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required />
        
        {/* Transmission */}
        <label htmlFor="transmission">Transmission:</label><br />
        <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select><br />
        
        {/* Pick Up Location */}
        <label htmlFor="pickup">Pick Up Location:</label><br />
        <input type="text" id="pickup" name="pickup" value={formData.pickup} onChange={handleChange} required />
        
        {/* Drop Off Location */}
        <label htmlFor="dropoff">Drop Off Location:</label><br />
        <input type="text" id="dropoff" name="dropoff" value={formData.dropoff} onChange={handleChange} required />
        
        {/* Price */}
        <label htmlFor="price">Price (in $):</label><br />
        <input type="number" id="price" name="price" step="0.01" min="0" value={formData.price} onChange={handleChange} required />
        
        {/* Days Availability */}
        <label htmlFor="days_availability">Days Available:</label><br />
        <input type="number" id="days_availability" name="days_availability" placeholder="Enter the number of available days (e.g., 5)" value={formData.days_availability} onChange={handleChange} required />
        
        {/* Submit Button */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddCar;
