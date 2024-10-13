import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css';

const LogIn = () => {

    const [data,setData]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState("")

    const handleChange =({currentTarget:input})=>{
        setData({...data,[input.name]:input.value})

    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const url = 'http://localhost:3000/api/loginUser';
            const {data:res}=await axios.post(url,data);
            localStorage.setItem("token",res.data)
            window.location="/Home"
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
                <div className="logo">Isakay</div>
                <div className="welcome-text"> {/* Centered welcome text container */}
                    <h1>Hi there!</h1>
                    <p>Welcome to Isakay.<br /> Car rental</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder='Enter your Email'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder='Enter your Password'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Sign In</button>
                </form>
                <p><Link to="#">Forgot password?</Link></p>
                <p>Don't have an account? <Link to="/SignUp">Sign up</Link></p>
            </div>
            <div className="image-container"></div> {/* Right image container */}
        </div>
  )

}

export default LogIn
