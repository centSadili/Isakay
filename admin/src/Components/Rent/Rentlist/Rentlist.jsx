import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rentlist = () => {
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => { // Fixed the function name to be more descriptive
            try {
                const response = await axios.get('http://localhost:3000/api/rents/user-rent-details/'); 
                setRents(response.data.rentDetails);
                console.log(response.data.rentDetails);
            } catch (err) {
                setError('Error fetching users. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [rents]);
    const deleteRentDetails = async (rentId,carId) => {
        try {
            //Palagay ng Validation Dito
          const response = await axios.delete(`http://localhost:3000/api/rent/delete-rent-details/${rentId}`);
          alert(response.data.message);
          if (response.status === 200) {
            alert('Rent CANCELLED successfully');
    
             // Update the car status to 'false'
          await axios.put(`http://localhost:3000/api/updatecar/${carId}`, { status: true });
    
          } 
        } catch (error) {
          if (error.response) {
            alert(error.response.data.error || 'Error deleting rent details.'); // Notify user of error
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      };

    const handleRentClick = (rentId) => {
        localStorage.setItem('rentId', rentId); 
        
    }; 


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  return (
    <div>
                  <Link to='/admin/rent/add'>Rent Car</Link>
            {rents.map((rent) => (
                <Link 
                    style={{ textDecoration: 'none' }} 
                    key={rent._id} // Use user._id as the key
                    
                    onClick={() => handleRentClick(rent._id)}
                >
                <div key={rent._id}>
                <h2>Name: {rent.renterID.firstname} {rent.renterID.lastname}</h2>
                <h2>Car: {rent.carID.car_name}</h2>
                <h2>Pick Up: {rent.carID.pickup}</h2>
                <h2>Drop Off: {rent.carID.dropoff}</h2>
                <h2>Pick up date:{rent.pickUpDate}</h2>
                <h2>Days: {rent.carID.days_availability}</h2>
                <h2>Price: {rent.carID.price}</h2>
                <button onClick={() => deleteRentDetails(rent._id,rent.carID._id)}>Cancel</button>
                <button>View Details</button>
              </div>
                </Link>
            ))}
    </div>
  )
}

export default Rentlist
