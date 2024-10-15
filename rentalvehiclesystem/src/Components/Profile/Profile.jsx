// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Profile = () => {
  const  id  = localStorage.getItem("id") || 'ID Not Found' // Get the user ID from the localStorage
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Retrieve token if using authentication
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            // Include the token in headers if required
            Authorization: token ? `Bearer ${token}` : '',
          },
        };

        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error || !user) {
    return <div>Error loading user details.</div>;
  }

  return (
    <div className="profile-container">
      <h2>{user.firstName}'s Profile</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p>
      
    </div>
  );
};

export default Profile;
