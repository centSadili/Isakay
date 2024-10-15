import React from 'react';

const AddCar = () => {
  return (
    <div>
      <h2>Car Listing Form</h2>
      <form action="/submit-car" method="POST" encType="multipart/form-data">
        {/* Car Name */}
        <label htmlFor="car_name">Car Name:</label><br />
        <input type="text" id="car_name" name="car_name" required /><br />
        
        {/* Seats */}
        <label htmlFor="seats">Seats:</label><br />
        <input type="number" id="seats" name="seats" min="1" required /><br />
        
        {/* Image */}
        <label htmlFor="image">Car Image:</label><br />
        <input type="file" id="image" name="image" accept="image/*" required /><br />
        
        {/* Transmission */}
        <label htmlFor="transmission">Transmission:</label><br />
        <select id="transmission" name="transmission" required>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select><br />
        
        {/* Pick Up Location */}
        <label htmlFor="pickup">Pick Up Location:</label><br />
        <input type="text" id="pickup" name="pickup" required /><br />
        
        {/* Drop Off Location */}
        <label htmlFor="dropoff">Drop Off Location:</label><br />
        <input type="text" id="dropoff" name="dropoff" required /><br />
        
        {/* Price */}
        <label htmlFor="price">Price (in $):</label><br />
        <input type="number" id="price" name="price" step="0.01" min="0" required /><br />
        
        {/* Days Availability */}
        <label htmlFor="days_availability">Days Available:</label><br />
        <input type="number" id="days_availability" name="days_availability" placeholder="Enter the number of available days (e.g., 5)" required /><br />
        
        {/* Submit Button */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddCar;
