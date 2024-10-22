import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';




const Home = () => {
  const  id  = localStorage.getItem("id") || 'ID Not Found' // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate()
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
  

const logOut = () =>{
  localStorage.clear()
  localStorage.setItem('id',null)
  setUser(null)
}

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error || !user) {
    return (
    <div>
      <h1>Please Log in First</h1> 
      <Link to="/login">
          {/* Log in Button Added */}
          <button>Log in</button>
      </Link>
    </div>
    );
  }
  return (
    <div>

<Link to="/admin/user/profile">
            <span>{user.firstName} {user.lastName}</span>
            </Link>       
          <Link to="/login">
          {/* Log out Button Added */}
          <button onClick={logOut}>Log out</button>
          </Link>

         
          <Link to='/admin/car/list'>Cars Page</Link>
          <Link to='/admin/user/list'>Users Page</Link>
          <Link to='/admin/rent/list'>Rents Page</Link>
            
         
        
    </div>
  )
}

export default Home
