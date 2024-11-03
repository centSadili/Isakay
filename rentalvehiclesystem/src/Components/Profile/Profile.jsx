// src/components/Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import UserRentalDashboard from "../UserRentalDashboard/UserRentalDashboard";
import './Profile.css'
import {Modal, Button} from 'antd'
import Header from "../Header/Header";
import Head from '../Head';


const Profile = () => {
  const id = localStorage.getItem("id") || "ID Not Found"; // Get the user ID from the localStorage
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [userPass, setPass] = useState({
    CurrentPass: "",
    NewPass: "",
    RetypeNew: ""
  })
  
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [ChangePass, setChangePass] = useState(false);
  const [isActive, setActive] = useState(false);

  // Retrieve token if using authentication
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure you want to update your details?")) {
        const url = `http://localhost:3000/api/user/update/${id}`; // Update URL

        // Create FormData to include both user data and image
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        
        // Append the image if it exists
        if (image) {
          formData.append("image", image);
        }
        
        console.log("Sending data:", user); // Log the data being sent

        const res = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type
            Authorization: token ? `Bearer ${token}` : "",
          },
        }); // Use PUT method

        console.log(res.data.message);
        navigate("/Home");
        // Optionally, you might want to update the state or redirect after successful update
      }
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

  const handleChangePass = (e)=>{
    e.preventDefault();
    axios.post('')
    .then()
    .catch((err)=> console.error(err))
  }
  const handleCpass = ({currentTarget: input})=>{
    setChangePass({...userPass, [input.name]: input.value});
  }
  const handleCancel = () => {
    setActive(false);
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (!user) {
    return <div>Error loading user details.</div>;
  }

  return (
    <div className="profile-container"> 
      <Head title="User Profile"/>
    <Header></Header>
    <div>
      
    </div>
    <div className="scrollable-cont">
    <div className ="info-update">
      
        
      <form onSubmit={handleUpdate}>
      <div className="main-picture">
      <img src={`http://localhost:3000/api/car_img/${user.image}`} alt="Profile"  />
     
      </div>
       
      <div className="">
      <label htmlFor="image">Change Picture:</label> <br />
      <input className="img-input" type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
            
      </div><br />
                  
        <div className="">
        <label>First Name:</label> <br />
        <input
        className="input"
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        </div>

        <div className=""> 
        <label>Last Name:</label><br />
        <input
        className="input"
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        </div>
        
        

          <div className=""> 
          <label>Email:</label><br />
                  <input
                  className="input"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />

<button  type="button" onClick={()=> setActive(!isActive)} className="ChangePass">Change Password</button>



{error && <div className="error">{error}</div>}

          </div>

        
  <div className="button-container">
    <button className="update" type="submit">Update</button>
    <Link to="/Home">
      <button className="return1">Return</button>
    </Link>
  </div>
              
      </form>
        
         </div>
      <div className="dashboard">
      <UserRentalDashboard/>
      </div>

      <Modal
        title="Change Password"
        open={isActive}
        onOk={handleChangePass}
        okText="Submit"
        onCancel={handleCancel}
      >
        <form method="post" onSubmit={handleChangePass}>
          <label htmlFor="CurrentPass">Current Password</label>
          <input 
          type="password" 
          name="CurrentPass" 
          id=""
          placeholder="Current Password"
          onChange={handleCpass}
          required />
          <label htmlFor="NewPass">New Password</label>
          <input type="password" 
          name="NewPass" 
          id=""
          placeholder="New Password"
          onChange={handleCpass}
          required
           />
           <label htmlFor="RetypeNew">Retype Password</label>
           <input type="password" 
           name="RetypeNew" 
           id=""
           placeholder="Retype your Password"
           onChange={handleCpass}
           required
            />
        </form>
      </Modal>
      
      {/* {isActive &&
        <div className="changePass-Modal">
          <div className="overlay" ></div>
          <div className="changePass-Content">
              <h3>{user.firstName} {user.lastName} || Change Password</h3>
              <form method="post" onSubmit={handleChangePass}>
                  <label htmlFor="CurrentPass">Current Password</label>
                  <input 
                  type="password" 
                  name="CurPass" 
                  id=""
                  placeholder="Current Password"
                  required/>
              </form>
              <button type="button" onClick={()=> setActive(!isActive)}>Close</button>
          </div>
      </div>
      } */}
      
    </div>
      
    </div>
    
  );
};

export default Profile;