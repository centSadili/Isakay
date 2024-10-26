import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Login.css';

const ForgotPassword = () => {

    const [email,setEmail]=useState()
    const [error,setError]=useState("")

    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/user/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                // navigate('/login')
                alert(`message sent on your email!`)
               
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className="container">
  <div className="form-container">
    <div className="welcome-text">
        <h1>ISAKAY</h1>
        <p>Forgot your Password?</p>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="input-group">
        <input
            type="email"
            className="input"
            placeholder=" "
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
        />
        <label className="user-label">Email</label>
    </div>
    {error && <div className="error">{error}</div>}
    
    <button className='butt' type="submit">Send</button>
    <Link to="/login"><button className='butt'>Back to Login</button></Link>
</form>



    
  </div>
  <div className="image-container"></div>
</div>
  )

}

export default ForgotPassword
