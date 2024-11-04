import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Login.css';
import Head from '../Head';

const ForgotPassword = () => {

    const [email,setEmail]=useState("")
    const [msg,setMsg]=useState("")
    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:3000/api/resetpassword', {email})
        .then(res => {
              if(res.data.status == "Success"){
                setMsg(res.data.status)
                console.log(res.data)
              }
              else if(res.data.status == "User not found"){
                setMsg(res.data.status)
              }
              setSuccess(true)
              setLoading(false)
        }).catch(err => console.log(err))
    }
  return (
    <div className="container">
      <Head title="Forgot Password"/>
      <div className="form-container">
        <div className="welcome-text">
          <h1>ISAKAY</h1>
          <p>Forgot your Password</p>
        </div>
        
      <form onSubmit={handleSubmit}>
      {!success && 
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
      }
      {isLoading && 
      <div>
        <img src="" alt="LoadingLogo" />
        <div>Loading...</div>
      </div>}
    {success && (
      <div className="msg">{msg}</div>
    )}
    {!success && <button className='butt' type="submit">Send</button>}
    <Link to="/login"><button className='butt' type='button'>Back to Login</button></Link>
    </form>
  </div>
  <div className="image-container"></div>
</div>
  )

}

export default ForgotPassword
