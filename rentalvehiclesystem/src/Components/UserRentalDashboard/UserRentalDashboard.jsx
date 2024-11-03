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
        <div className='dash-container'>
        <div className='title'><h1>Booking Dashboard</h1> </div>
        
        <div className="details-container">
        {rents.length > 0 ? (
          rents.map((rent) => (
            <div key={rent._id}>

              <div className="divider">
              <h2>Name: {rent.renterID.firstname} {rent.renterID.lastname}</h2>
              <h2>Car: {rent.carID.car_name}</h2> <br />
              <h2>Pick up date:{rent.pickUpDate ? new Date(rent.pickUpDate).toISOString().split("T")[0] : ""}</h2> <br />
              <h2>Pick Up: {rent.carID.pickup}  <span className='spaced'>Drop Off: {rent.carID.dropoff}</span></h2> <br />
              <h2>Days: {rent.carID.days_availability} <span className='spaced'>Price: {rent.carID.price} </span> </h2> <br />
              
              <div className="clickables">
              <button className='view' onClick={()=>viewdetails(rent)}>View Details</button>
                  <div>
                  <button className='delete' onClick={() => deleteRentDetails(rent._id,rent.carID._id)}>Cancel Booking</button>

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
        <div>
          {isActive && (
            <div className="modal">
              <div className="overlay" onClick={viewdetails}></div>
              <div className="content">
                  <h1>Rent Details</h1>
                 
                    <div key={rentDetail._id}>
                      <h1>Personal Details</h1>
                      <h2>First Name: {rentDetail.renterID.firstname} <span className='spaced'>Last Name: {rentDetail.renterID.lastname}</span></h2>
                      <h2>Suffix: {rentDetail.renterID.suffix} <span className='spaced'>Gender: {rentDetail.renterID.gender}</span></h2>
                      <h2>Birthday: {rentDetail.renterID.birthday ? new Date(rentDetail.renterID.birthday).toISOString().split("T")[0] : ""}</h2> 
                      <h2>Address: {rentDetail.renterID.address.street} {rentDetail.renterID.address.city}, {rentDetail.renterID.address.state}</h2><br />
                      <h2>Pick Up: {rentDetail.carID.pickup} <span className='spaced'> Drop Off: {rentDetail.carID.dropoff}</span> </h2>
                      <h2>Days: {rentDetail.carID.days_availability} Day/s <span className='spaced'>Price: {rentDetail.carID.price}</span> </h2>
                      <h2>Pick up date:{rentDetail.pickUpDate ? new Date(rentDetail.pickUpDate).toISOString().split("T")[0] : ""}</h2> <br />
                      <h1>Specifications</h1>

                      <div className='Specifications'>
                      <img src={`http://localhost:3000/api/car_img/${rentDetail.carID.image}`} alt='Rented Car' className='img-spec'/>
                      <h2>Car Rented: {rentDetail.carID.car_name} <br />Body type: {rentDetail.carID.body_type} <br />
                      Seat Capacity: {rentDetail.carID.seats} <br />
                      Transmission: {rentDetail.carID.transmission}
                      </h2>
                      </div>
                      
                    </div>
                    <div className='clickables'>
                      <div>
                      <button className='close' onClick={()=>viewdetails()}>Close</button>
                    <Link to={'/update/rent/'+rentDetail._id}><button className='view' >Update</button></Link>
                      </div>     
                    </div>
                
                  
              </div>
            </div>
          )}
          </div>

        
          
        
      </div>
      );
}

export default UserRentalDashboard