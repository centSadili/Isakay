import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from 'antd';
import './Header.css';
import Logo from "../../images/main.png"

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
        <div className="carlist-header">
            {/* Logo */}
            <Link to="/Home" className="logo">
                <img
                    src={Logo}
                    alt="Logo"
                    className="logo-img"
                />
                <h4>Isakay Rental</h4>
            </Link>

            {/* Hamburger icon for mobile */}
            <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navigation Links */}
            <nav className={`navigationlinks ${menuOpen ? 'show' : ''}`}>
                <Link to="/Home">Home</Link>
                <Link to="/vehicles">Vehicles</Link>
                <Link to="/about_us">About</Link>
                <Link to="/contact">Contact Us</Link>
            </nav>

            {/* Profile */}
            <div className="profile">
                <Avatar
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
                    <button className="logout" onClick={logOut}>{user? 'Logout':'SignUp'}</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
