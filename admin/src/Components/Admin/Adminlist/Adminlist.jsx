import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Avatar, Card} from 'antd';
const Adminlist = () => {
    const [allUsers,setAllUsers]=useState([])
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [search,setSearch]=useState('all')
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); 
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                const users = response.data;
    
              
                if (users && users.length > 0) {
                    const adminUsers = users.filter(user => user.admin);
                    setAllUsers(adminUsers); 
                    setUsers(adminUsers); 
                } else {
                    setUsers([]); 
                }
    
                console.log(users);
            } catch (err) {
                setError('Error fetching users. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);
    
    useEffect(()=>{
        if(search==='all' || search ===''){
            setUsers(allUsers);
        }else{
            const filteredUsers = allUsers.filter(
                user => 
                    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(search.toLowerCase())  ||
                    user.email.toLowerCase().includes(search.toLowerCase())     ||
                    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
            );
            setUsers(filteredUsers);
        }
    },[search, allUsers])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleUserClick = (userId) => {
        localStorage.setItem('userId', userId); 
        console.log(userId);
    }; 
    const handleSearch = (cat) => {
        setSearch(cat);
    };
    return (
        <div>
            <Link to='/admin/user/add'>Sign up User</Link>
            <label htmlFor="">Search User</label>
            <input type="text" onChange={(e) => handleSearch(e.target.value)}/>
            {users.map((user) => (
                
                <Link 
                    style={{ textDecoration: 'none' }} 
                    key={user._id} 
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
