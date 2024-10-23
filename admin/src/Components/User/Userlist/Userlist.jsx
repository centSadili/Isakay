import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => { // Fixed the function name to be more descriptive
            try {
                const response = await axios.get('http://localhost:3000/api/users'); 
                setUsers(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Error fetching users. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleUserClick = (userId) => {
        localStorage.setItem('userId', userId); // Fixed to use userId instead of usersId
        console.log(userId);
    }; 

    return (
        <div>
            <Link to='/admin/user/add'>Sign up User</Link>
            {users.map((user) => (
                <Link 
                    style={{ textDecoration: 'none' }} 
                    key={user._id} // Use user._id as the key
                    to={`/admin/user/profile`} 
                    onClick={() => handleUserClick(user._id)}
                >
                    <h2>Name: {user.firstName} {user.lastName}</h2>
                    <h2>Email: {user.email}</h2>
                    <br />
                </Link>
            ))}
        </div>
    );
}

export default Userlist;
