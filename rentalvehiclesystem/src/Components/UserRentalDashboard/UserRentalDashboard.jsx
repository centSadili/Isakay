import React, { useState ,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './dashboard.css'

const UserRentalDashboard = () => {
    const userId = localStorage.getItem('id')
    
    const [rents,setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const [isActive, setActive] = useState(false);

    const [rentDetail,setRentDetail]= useState(null);
    const navigate = useNavigate() 
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/user-rent-details/'+userId); 
                setRents(response.data.rentDetails);
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
          if (window.confirm("Are you sure you want to Cancel your Rent?")){
            const response = await axios.delete(`http://localhost:3000/api/rent/delete-rent-details/${rentId}`);
            alert(response.data.message);
            if (response.status === 200) {
              alert('Rent CANCELLED successfully');
      
               // Update the car status to 'false'
            await axios.put(`http://localhost:3000/api/updatecar/${carId}`, { status: true });
      
            } 
          }

        } catch (error) {
          if (error.response) {
            alert(error.response.data.error || 'Error deleting rent details.'); // Notify user of error
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      };

      const viewdetails = (rent)=>{
        setRentDetail(rent)
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
                <button onClick={()=>viewdetails(rent)}>View Details</button>
              </div>
            ))
          ) : (
            <p>No rent details available.</p>
          )}

          {/* View details */}
          <div>
          {isActive && (
            <div className="modal">
              <div className="overlay" onClick={viewdetails}></div>
              <div className="content">
                  <h1>Car Details</h1>
                 
                    <div key={rentDetail._id}>
                      <h1>Personal Details</h1>
                      <h2>First Name: {rentDetail.renterID.firstname} </h2>
                      <h2>Last Name: {rentDetail.renterID.lastname}</h2>
                      <h2>Suffix: {rentDetail.renterID.suffix}</h2>
                      <h2>Gender: {rentDetail.renterID.gender}</h2>
                      <h2>Birthday: {rentDetail.renterID.birthday}</h2>
                      <h2>Address: {rentDetail.renterID.address.street} {rentDetail.renterID.address.city}, {rentDetail.renterID.address.state}</h2>
                      <h2>Car: {rentDetail.carID.car_name}</h2>
                      <h2>Pick Up: {rentDetail.carID.pickup}</h2>
                      <h2>Drop Off: {rentDetail.carID.dropoff}</h2>
                      <h2>Pick up date:{rentDetail.pickUpDate}</h2>
                      <h2>Days: {rentDetail.carID.days_availability}</h2>
                      <h2>Price: {rentDetail.carID.price}</h2>
                      <h1>Specifications</h1>
                      <img src={`http://localhost:3000/api/car_img/${rentDetail.carID.image}`} alt='Rented Car' className='img-spec'/>
                      <h2>Body type: {rentDetail.carID.body_type}</h2>
                      <h2>Seat Capacity: {rentDetail.carID.seats}</h2>
                      <h2>Transmission: {rentDetail.carID.transmission}</h2>
                    </div>
                
                  <button onClick={()=>viewdetails()}>Close</button>
              </div>
            </div>
          )}
          </div>
        </div>
      );
}

export default UserRentalDashboard
