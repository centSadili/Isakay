import React, { useState ,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './dashboard.css'
import Modal from './Modal';


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

      const viewDetails = (rent) => {
        setDetails([rent]); // Set the details for the specific rent
        setActive(true); // Use setActive to open the modal
    };
    
    const closeModal = () => {
        setActive(false); // Use setActive to close the modal
    };

    if (loading) return <div>Loading...</div>;
  
    return (
        <div className='dash-container'>
          <div className='title'><h1>Booking Dashboard</h1> </div>
          
          <div className="details-container">
          {rents.length > 0 ? (
            rents.map((rent) => (
              <div key={rent._id}>

                <div className="divider">
                <h2>Name: {rent.renterID.firstname} {rent.renterID.lastname}</h2>
                <h2>Car: {rent.carID.car_name}</h2> <br />
                <h2>Pick up date:{rent.pickUpDate}</h2> <br />
                <h2>Pick Up: {rent.carID.pickup} <span> Drop Off: {rent.carID.dropoff} </span></h2> <br />
                <h2>Days: {rent.carID.days_availability} <span>Price: {rent.carID.price}</span></h2> <br />
                
                <div className="clickables">
                <button className='view' onClick={() => viewDetails(rent)}>View Details</button>
                    <div>
                    <button className='delete'onClick={() => deleteRentDetails(rent._id,rent.carID._id)}>Cancel Booking</button>

                    </div>

                    <div>
                    

                    </div>
                </div>
                

                </div>
                
              </div>
            ))
          ) : (
            <p>No rent details available.</p>
          )}
          </div>
          <Modal isActive={isActive} details={details} onClose={closeModal} />

          
            
            {/* irerender lahat ng nasa console.log sa console modify nyo nlng*/}
          
          {/* View details */}
        
        </div>
      );
}

export default UserRentalDashboard
