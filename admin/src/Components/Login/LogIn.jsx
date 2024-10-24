import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css';

const LogIn = () => {

    const [data,setData]=useState({
        email:"",
        password:"",
       
    })
    const [error,setError]=useState("")

    const handleChange =({currentTarget:input})=>{
        setData({...data,[input.name]:input.value})

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const url = 'http://localhost:3000/api/loginUser';
            const response = await axios.post(url, data);
            // Access the token directly from response.data
            const token = response.data.token;
            const userId=response.data.userId;
            const isAdmin=response.data.admin;
            console.log(isAdmin)


            if (token) {
                localStorage.setItem("token", token);
                console.log('Token stored successfully:', token);
                if (isAdmin) {
                    window.location = "/Home"; // Redirect for admin
                } 
                if(isAdmin==false) {
                    alert('Only Admin Can Access Admin Server'); // Alert for non-admin
                }
            } else {
                console.error('Token is undefined in the response:', response.data);
            }
    
            localStorage.setItem("id", userId);
   
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
  <div className="form-container">
    <div className="welcome-text">
        <h1>Hi there!</h1>
        <p>Welcome to Isakay car rental</p>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="input-group">
        <input
            type="email"
            className="input"
            placeholder=" "
            name="email"
            value={data.email}
            onChange={handleChange}
            required
        />
        <label className="user-label">Email</label>
    </div>
    
    <div className="input-group">
        <input
            type="password"
            className="input"
            placeholder=" "
            name="password"
            value={data.password}
            onChange={handleChange}
            required
        />
        <label className="user-label">Password</label>
        <div className='forgot'> <p><Link to="#">Forgot password?</Link></p> </div>
    </div>
    {error && <div className="error">{error}</div>}
    
    <button className='butt' type="submit">Sign In</button>
</form>

    
  </div>
  <div className="image-container"></div>
</div>
  )

}

export default LogIn
