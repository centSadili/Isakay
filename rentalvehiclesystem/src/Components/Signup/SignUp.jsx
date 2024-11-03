import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';
import Head from '../Head';

const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [image, setImage] = useState(null); // State to hold the image file
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input changes for text fields
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    // Handle image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm("Please review and confirm your details before proceeding.")) {
                const formData = new FormData(); // Create FormData object
                formData.append('firstName', data.firstName);
                formData.append('lastName', data.lastName);
                formData.append('email', data.email);
                formData.append('password', data.password);
                formData.append('image', image); // Append the image file
    
                const url = 'http://localhost:3000/api/registerUser';
                const { data: res } = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                navigate('/login');
                console.log(res.message);
            }

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
            console.error('Error response:', error.response);
        }
    };
  return (
    <div className="container">
        <Head title="Sign Up"/>
            <div className="image-section"></div>
            <div className="form-section">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up Here!</h1>
                        {error && <div className="error">{error}</div>}
                        <div className="input-box">
                            <label htmlFor="image">Profile Picture:</label><br />
                            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
                        </div>
                        <div className="input-box">
                            <label>First Name:</label>
                            <input type="text" placeholder='Enter your First Name' name='firstName' value={data.firstName} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <label>Last Name:</label>
                            <input type="text" placeholder='Enter your Last Name' name='lastName' value={data.lastName} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <label>Email:</label>
                            <input type="email" placeholder='Enter your Email' name='email' value={data.email} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <label>Password:</label>
                            <input type="password" placeholder='Enter your Password' name='password' value={data.password} onChange={handleChange} required />
                        </div>
                        <button type="submit">Sign Up</button>
                        <div className="register-link">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp
