import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
    <div>
        <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
    <h1>Sign In</h1>
    <br />
    <label>Email: </label>
    <input type="email" placeholder='Enter your Email' name='email' value={data.email} onChange={handleChange}required/>
    <br />
    <label>Password: </label>
    <input type="password" placeholder='Enter your Password' name='password' value={data.password} onChange={handleChange}required/>
    <br />
    {error && <div>{error}  </div>}
    <button type="submit">Sign In</button>
      </form>
    </div>
  )

}

export default LogIn
