import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Avatar, Card} from 'antd';
const Adminlist = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Set loading to true at the start of the fetch
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                const users = response.data;
    
                // Assuming response.data is an array of users
                if (users && users.length > 0) {
                    // Filter users that are admin
                    const adminUsers = users.filter(user => user.admin);
                    setUsers(adminUsers); // Only set admin users
                } else {
                    setUsers([]); // If no users found, clear the users state
                }
    
                console.log(users);
            } catch (err) {
                setError('Error fetching users. Please try again.');
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false after fetch
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
                <Card.Meta
                    avatar={<Avatar src={`http://localhost:3000/api/car_img/${user.image}`} />}
                    title={`${user.firstName} ${user.lastName}`}
                    description={
                        <>
                        <p>{user.email}</p>
                        </>
                    }
                    />
                </Link>
            ))}
        </div>
    );
}

export default Adminlist;
