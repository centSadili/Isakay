import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css';

const LogIn = () => {
    const [isActive, setActive] = useState(false);
    const [forgotemail, setForgot] = useState("");
    const [successForgot, setSuccessful] = useState(false);


    const [data,setData]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState("")

    //Forgotpassword
    const forgotChange = (input)=>{
        setForgot(input)
    }

    const handleChange =({currentTarget:input})=>{
        setData({...data,[input.name]:input.value})

    }
    //handles ForgotPassword Submission
    const handleforgotSubmit = async (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/api/resetpassword', forgotemail)
        .then((res)=>{
            const token = res.data.token;
            setSuccessful(!successForgot);
            localStorage.setItem("resetToken", token)
        }).catch((error)=>{
            console.error(error)
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const url = 'http://localhost:3000/api/loginUser';
            const response = await axios.post(url, data);
    // Access the token directly from response.data
    const token = response.data.token;
    const userId=response.data.userId;

    if (token) {
        localStorage.setItem("token", token);
        console.log('Token stored successfully:', token);
    } else {
        console.error('Token is undefined in the response:', response.data);
    }
    
    localStorage.setItem("id", userId);
    window.location="/Home"
            console.log(response.data.message)
        }catch(error){
            if(error.response.status>=400 && 
               error.response.status<=500
            ){
                setError(error.response.data.message)
            }
            console.error('Error response:', error.response);
        }
    }
    //changes to Forgot password toggle modal
    const forgotpass = ()=>{
        setActive(!isActive);
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
        <div className='forgot'> 
            <button type="button" onClick={()=> {forgotpass()}}>Forgot password?</button> 
        </div>
    </div>
    {error && <div className="error">{error}</div>}
    
    <button className='butt' type="submit">Sign In</button>
</form>
{/*Forgot Password render*/}
{isActive && (
        <div>
            <div className='modal'></div>
            <div className='overlay' onClick={()=>forgotpass()}></div>
            <div className='forgotpass-content'>
                <h1>Forgot Password?</h1>                
                {!successForgot && (
                    <>
                    <form onSubmit={handleforgotSubmit}>
                        <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder=" "
                            value={forgotemail}
                            onChange={(e)=> forgotChange(e.target.value)}
                            name="email"
                            required
                        />
                        <button className='butt' type='submit'>Submit</button>
                    </form>
                    <button className='butt' type='button' onClick={()=>forgotpass()}>Close</button>
                    </>
                )}
                {successForgot && (
                    <>
                    <h2>We have sent the verification code</h2>
                    <p>Check your email for the code, you may now close this window</p>
                    <button className='butt' type='button' onClick={()=>forgotpass()}>Close</button>
                    </>
                )}
                
            </div>
        </div>
    )}
    <div className='hyperlinks'><p>Don't have an account? <Link to="/SignUp">Sign up</Link></p></div>
    
  </div>
  <div className="image-container"></div>
</div>
  )

}

export default LogIn
