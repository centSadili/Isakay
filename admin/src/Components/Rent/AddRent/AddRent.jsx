import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

const AddRent = () => {
    const  id  = localStorage.getItem("id") || 'ID Not Found'
    const [pickup,setPickup]=useState();
    const [dropoff,setDropoff]=useState();
    const [daysAvailability, setDaysAvailability] = useState(); 
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
    
        try{
          localStorage.setItem('pickup',pickup)
          localStorage.setItem('dropoff',dropoff)
          localStorage.setItem('daysAvailability',daysAvailability)
          navigate("/admin/search/rent")
        }catch(err){
          
          console.error('Error fetching user:', err);
        }
      }
  return (
    <div>
            <form onSubmit={handleSubmit}>
             {/* Pick Up Location */}
             <div className="form-group">
            <label htmlFor="pickup">Pick Up Location:</label>
            <input type="text" id="pickup" name="pickup" onChange={(e)=>setPickup(e.target.value)} required />
            </div>

            {/* Drop Off Location */}
            <div className="form-group">
            <label htmlFor="dropoff">Drop Off Location:</label>
            <input type="text" id="dropoff" name="dropoff" onChange={(e)=>setDropoff(e.target.value)} required />
            </div>

            {/* Days Availability */}
            <div className="form-group">
            <label htmlFor="days_availability">Days Available:</label>
            <input type="number" id="days_availability" name="days_availability" placeholder="Enter the number of available days (e.g., 5)" onChange={(e)=>setDaysAvailability(e.target.value)} required /><br />
            </div>
            <button className="btn" type='submit'>Book Now</button>
            </form>
    </div>
  )
}

export default AddRent
