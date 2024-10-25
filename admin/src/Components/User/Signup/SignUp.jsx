import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './SignUp.css';
import { FaUser, FaLock } from 'react-icons/fa';

const SignUp = () => {
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        admin:false,
    })
    const [image, setImage] = useState(null);
    const [error,setError]=useState("")
    const navigate = useNavigate() 
    const handleChange =({currentTarget:input})=>{
        setData({...data,[input.name]:input.value})

    }
   
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); 
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let warning = ''
            if(data.admin==true){
                warning=`Are you sure to add this user as Admin:${data.firstName}`
            }else{
                warning = `Are your Sure to Add this User: ${data.firstName}`
            }
            if (window.confirm(warning)){
                const formData = new FormData(); // Create FormData object
                formData.append('firstName', data.firstName);
                formData.append('lastName', data.lastName);
                formData.append('email', data.email);
                formData.append('password', data.password);
                formData.append('image', image); // Append the image file
                formData.append('admin', data.admin);
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
    const handleCheckboxChange = () => {
        setData({ ...data, admin: !data.admin });
    };
  return (
    <div className="container">
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
                        <div className="input-box">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={data.isAdmin} 
                                    onChange={handleCheckboxChange} 
                                />
                                Admin
                            </label>
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
