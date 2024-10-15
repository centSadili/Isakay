// src/components/Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const id = localStorage.getItem("id") || "ID Not Found"; // Get the user ID from the localStorage
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
});
  
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Retrieve token if using authentication
  const token = localStorage.getItem("token");

  const handleChange =({currentTarget:input})=>{
    setUser({...user,[input.name]:input.value})
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            // Include the token in headers if required
            Authorization: token ? `Bearer ${token}` : "",
          },
        };

        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleUpdate =  async (e) => {
    e.preventDefault(); 
    try {
      const url = `http://localhost:3000/api/user/update/${id}`; // Update URL
      
  
      // Create a new object without the _id field
      const { _id,admin,created,__v, ...userData } = user; // Destructure to exclude _id
      
      console.log("Sending data:", userData); // Log the data being sent
  
      const res = await axios.put(url, userData); // Use PUT method
  
      console.log(res.message);
      // Optionally, you might want to update the state or redirect after successful update
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message || "An error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("Network error or request failed. Please try again.");
      }
      console.error("Error response:", error);
    }
  };
  
  
  

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if ( !user) {
    return <div>Error loading user details.</div>;
  }

  return (
    <div className="profile-container">
      <form onSubmit={handleUpdate}>
        <label>First Name:</label>
        <input
          type="text"
          placeholder="Enter your First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          placeholder="Enter your Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your New Password"
          name="password"
          
          onChange={handleChange}
          required
        />
{error && <div className="error">{error}</div>}
        <button type="submit">Update</button>
      </form>

      <button>Cancel</button>
    </div>
  );
};


export default Profile;
