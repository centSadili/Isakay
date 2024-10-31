import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from 'antd';
import './Header.css';

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
            <Link style={{ textDecoration: "none" }} to="/Home">
                <img
                    src="https://cdn-icons-png.flaticon.com/128/3085/3085411.png"
                    alt="Logo Image"
                    className="logo-img"
                />
            </Link>
            <a href="#" className="logo">Isakay</a>

            {/* Hamburger icon for mobile */}
            <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

           
            <nav className={`navbarcarlist ${menuOpen ? 'show' : ''}`}>
                <div className={`navigationlinks ${menuOpen ? 'show' : ''}`}>
                    <span><Link style={{ textDecoration: "none" }} to="/Home">Home</Link></span>
                    <span><Link style={{ textDecoration: "none" }} to="/vehicles">Vehicles</Link></span>
                    <span><Link style={{ textDecoration: "none" }} to="/about_us">About</Link></span>
                    <span><Link style={{ textDecoration: "none" }} to="/contact">Contact Us</Link></span>

                    <div className="profile">
  <Link style={{ textDecoration: "none" }} to="/profile">
    <div className="prof-container">
      <Avatar
        size={90}
        icon={
          <img
            src={user && user.image ? `http://localhost:3000/api/car_img/${user.image}` : "default_profile_img.png"}
            alt="Profile"
          />
        }
      />
      <div className="name">
        {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
        <br />
        <p>New User</p>
      </div>
    </div>
  </Link>
  <button className="logout" onClick={logOut}>
    <div className="sign">
      <svg viewBox="0 0 512 512">
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
      </svg>
    </div>
    <div className="text">{user ? "Logout" : "Sign up"}</div>
  </button>
</div>



                </div>

                



            </nav>

          
        </div>
    );
};

export default Header;
