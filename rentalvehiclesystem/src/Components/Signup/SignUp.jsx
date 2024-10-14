import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './SignUp.css';
import { FaUser, FaLock } from "react-icons/fa";

const SignUp = () => {
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const [error,setError]=useState("")
    const navigate = useNavigate() 
    const handleChange =({currentTarget:input})=>{
        setData({...data,[input.name]:input.value})

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const url = 'http://localhost:3000/api/registerUser';
            const {data:res}=await axios.post(url,data);
            navigate("/login")
            console.log(res.message)
        }catch(error){
            if(error.response.status>=400 && 
               error.response.status<=500
            ){
                setError(error.response.data.message)
            }
            console.error('Error response:', error.response);
        }
    }
  return (
    <div className="container">
            <div className="image-section"></div>
            <div className="form-section">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up Here!</h1>
                        {error && <div className="error">{error}</div>}
                        <div className="input-box">
                            <label>Firstname:</label>
                            <input type="text" placeholder='Enter your First Name' name='firstName' value={data.firstName} onChange={handleChange} required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <label>Lastname:</label>
                            <input type="text" placeholder='Enter your Last Name' name='lastName' value={data.lastName} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <label>Email:</label>
                            <input type="email" placeholder='Enter your Email' name='email' value={data.email} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <label>Password:</label>
                            <input type="password" placeholder='Enter your Password' name='password' value={data.password} onChange={handleChange} required />
                            <FaLock className="icon" />
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
