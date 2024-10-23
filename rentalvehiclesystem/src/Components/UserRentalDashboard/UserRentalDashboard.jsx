import React, { useState ,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

const UserRentalDashboard = () => {
    const userId = localStorage.getItem('id')
    
    const [rents,setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState([]);
    const [isActive, setActive] = useState(false);

    const navigate = useNavigate() 
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/user-rent-details/'+userId); 
                setRents(response.data.rentDetails);
                setDetails(response.data.rentDetails)
                console.log(response.data)
            } catch (err) {
                setError('Error fetching rents. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

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

      const viewdetails = ()=>{
        setActive(!isActive);
      }

    if (loading) return <div>Loading...</div>;
  
    return (
        <div>
            <h1>Dashboard</h1>
            {/* irerender lahat ng nasa console.log sa console modify nyo nlng*/}
          {rents.length > 0 ? (
            rents.map((rent) => (
              <div key={rent._id}>
                <h2>Name: {rent.renterID.firstname} {rent.renterID.lastname}</h2>
                <h2>Car: {rent.carID.car_name}</h2>
                <h2>Pick Up: {rent.carID.pickup}</h2>
                <h2>Drop Off: {rent.carID.dropoff}</h2>
                <h2>Pick up date:{rent.pickUpDate}</h2>
                <h2>Days: {rent.carID.days_availability}</h2>
                <h2>Price: {rent.carID.price}</h2>
                <button onClick={() => deleteRentDetails(rent._id,rent.carID._id)}>Cancel</button>
                <button onClick={()=>viewdetails()}>View Details</button>
              </div>
            ))
          ) : (
            <p>No rent details available.</p>
          )}
          {/* View details */}
          {isActive && (
              <div className="modal">
              <div className="overlay">
              </div>
              <div className="content">
                <h1>Car Details</h1>
                {details.map((info)=>(
                  <div key={info._id}>
                    <h1>Personal Details</h1>
                    <h2>First Name: {info.renterID.firstname} </h2>
                    <h2>Last Name: {info.renterID.lastname}</h2>
                    <h2>Suffix: {info.renterID.suffix}</h2>
                    <h2>Gender: {info.renterID.gender}</h2>
                    <h2>Birthday: {info.renterID.birthday}</h2>
                    <h2>Address: {info.renterID.address.street} {info.renterID.address.city}, {info.renterID.address.state}</h2>
                    <h2>Car: {info.carID.car_name}</h2>
                    <h2>Pick Up: {info.carID.pickup}</h2>
                    <h2>Drop Off: {info.carID.dropoff}</h2>
                    <h2>Pick up date:{info.pickUpDate}</h2>
                    <h2>Days: {info.carID.days_availability}</h2>
                    <h2>Price: {info.carID.price}</h2>
                    <h1>Specifications</h1>
                    <img src={`http://localhost:3000/api/car_img/${info.carID.image}`} alt='Rented Car'></img>
                    <h2>Body type: {info.carID.body_type}</h2>
                    <h2>Seat Capacity: {info.carID.seats}</h2>
                    <h2>Transmission: {info.carID.transmission}</h2>
                  </div>
                ))}
                <button onClick={()=>viewdetails()}>Close</button>
              </div>
              
            </div>
          )}
        </div>
      );
}

export default UserRentalDashboard
