import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

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
    <div>
        <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
    <h1>Create an Account</h1>
    <br />
    <label>Firstname: </label>
    <input type="text" placeholder='Enter your First Name' name='firstName' value={data.firstName} onChange={handleChange}required/>
    <br />
    <label>Lastname: </label>
    <input type="text" placeholder='Enter your Last Name' name='lastName' value={data.lastName} onChange={handleChange}required/>
    <br />
    <label>Email: </label>
    <input type="email" placeholder='Enter your Email' name='email' value={data.email} onChange={handleChange}required/>
    <br />
    <label>Password: </label>
    <input type="password" placeholder='Enter your Password' name='password' value={data.password} onChange={handleChange}required/>
    <br />
    {error && <div>{error}  </div>}
    <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
