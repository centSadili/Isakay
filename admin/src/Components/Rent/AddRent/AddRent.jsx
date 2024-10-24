import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

const AddRent = () => {
    const id = localStorage.getItem("id") || 'ID Not Found';
    const [pickup, setPickup] = useState(null); // Use null instead of undefined for better default handling
    const [dropoff, setDropoff] = useState(null);
    const [daysAvailability, setDaysAvailability] = useState(); 
    const navigate = useNavigate();
    const [cities, setCity] = useState([]);

    useEffect(() => { 
        // Fetch cities
        axios.get('https://psgc.gitlab.io/api/island-groups/luzon/cities/')
        .then((res) => {
            const cityNames = res.data.map((city, index) => ({ name: city.name, id: index })); // Add unique id with index
            setCity(cityNames.sort((a, b) => a.name.localeCompare(b.name))); // Sort and update state
        })
        .catch((error) => {
            console.error(error);
        });
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            localStorage.setItem('pickup', pickup);
            localStorage.setItem('dropoff', dropoff);
            localStorage.setItem('daysAvailability', daysAvailability);
            navigate("/admin/search/rent");
        } catch (err) {
            console.error('Error saving data:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Pick Up Location */}
                <div className="form-group">
                    <label htmlFor="pickup">Pick Up Location:</label>
                    <Autocomplete
                        options={cities} // Array of city objects
                        value={pickup}
                        onChange={(event, newValue) => setPickup(newValue ? newValue.name : '')} // Set the name as pickup
                        getOptionLabel={(option) => option.name} // Extract the city name as the label
                        renderInput={(params) => (
                            <TextField {...params} label="Pick Up Location" required />
                        )}
                    />
                </div>

                {/* Drop Off Location */}
                <div className="form-group">
                    <label htmlFor="dropoff">Drop Off Location:</label>
                    <Autocomplete
                        options={cities} // Array of city objects
                        value={dropoff}
                        onChange={(event, newValue) => setDropoff(newValue ? newValue.name : '')} // Set the name as dropoff
                        getOptionLabel={(option) => option.name} // Extract the city name as the label
                        renderInput={(params) => (
                            <TextField {...params} label="Drop Off Location" required />
                        )}
                    />
                </div>

                {/* Days Availability */}
                <div className="form-group">
                    <label htmlFor="days_availability">Days Available:</label>
                    <input 
                        type="number" 
                        id="days_availability" 
                        name="days_availability" 
                        placeholder="Enter the number of available days (e.g., 5)" 
                        onChange={(e) => setDaysAvailability(e.target.value)} 
                        required 
                    />
                </div>
                
                <button className="btn" type="submit">Book Now</button>
            </form>
        </div>
    );
}

export default AddRent;
