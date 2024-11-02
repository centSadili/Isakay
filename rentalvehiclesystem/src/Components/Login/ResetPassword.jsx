import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
const ResetPassword = () => {
  const [codeval, setCodeVal] = useState("")
  const [retype, setRetype] = useState("")
  const [msg, setMsg] = useState("");
  const [tokenmsg, setTokenMsg] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [searchParam] = useSearchParams()


  useEffect(()=>{
    const token = searchParam.get('resetToken')
    axios.post('http://localhost:3000/api/resetpassword/checkToken',{token})
    .then((res)=>{
      console.log(res.data)
      setTokenValid(true) 
    })
    .catch((err)=> {
      setTokenValid(false)
      setTokenMsg("Expired Token")
      console.error(err)
    })
  }, [searchParam])

  const handleSubmit = (e)=>{
    const token = searchParam.get('resetToken')
    e.preventDefault()
    if(retype != codeval){
      setMsg("Passwords do not match")
    }
    else{
      axios.post('http://localhost:3000/api/resetpassword/reset', {pass: retype, token: token})
      .then((res)=>{
        setTokenValid(false)
        setTokenMsg("You have Successfully Reset your Password!")
        console.log(res.data)
      })
      .catch((err)=> console.error(err))
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="welcome-text">
          <h1>ISAKAY</h1>
          <h2>Reset Password</h2>
        </div>
        {tokenValid ?( 
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="password" 
            name="newPass"
            className='input' 
            onChange={(e)=>setCodeVal(e.target.value)}
            placeholder=''
            required/>
            <label className="user-label">New Password</label>
          </div>
          <div className="input-group">
            <input type="password" 
            name="retype"
            placeholder=''
            className='input'
            onChange={(e)=> setRetype(e.target.value)}
            required/>
            <label className="user-label">Confirm Password</label>
          </div>
          <button className="butt" type="submit">Enter</button>
        </form>
        ) : (
        <div>
          <h3>{tokenmsg}</h3>
        </div>)}
      {msg && <div>{msg}</div>}
  </div>
  <div className="image-container"></div>
</div>
  )
}

export default ResetPassword
