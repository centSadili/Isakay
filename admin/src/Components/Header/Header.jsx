import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from 'antd';
import './Header.css';
import Logo from "../../assets/main.png"

const Header = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data.user);
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };

        if (id && token) {
            fetchUser();
        }
    }, [id, token]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
<header className="carlist-header">
    {/* Logo */}
    <Link to="/Home" className="logo">
        <img src={Logo} alt="Logo" className="logo-img" />
        <h4>Isakay Rental</h4>
    </Link>
    
    {/* Hamburger Menu */}
    <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    {/* Profile */}
    <div className={`profile ${menuOpen ? "show" : ""}`}>
        <Avatar
            className={menuOpen ? "hide-avatar" : ""}
            size={40}
            icon={
                <img
                    src={user && user.image ? `http://localhost:3000/api/car_img/${user.image}` : "default_profile_img.png"}
                    alt="Profile"
                />
            }
        />
        <div className="dropdown-menu">
            <div className="name">
                <Link to='/profile'>{user ? `${user.firstName} ${user.lastName}` : "Guest User"}</Link>  
            </div>
            <button className="logout" onClick={logOut}>{user ? 'Logout' : 'Sign Up'}</button>
        </div>
    </div>
</header>

    );
};

export default Header;
