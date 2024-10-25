import React, {useState }from 'react'
import axios from 'axios'
import './Login.css';
const Otp = () => {
  return (
    <div>
        <div>
            <h1>Email Verification</h1>
            <p>We have sent a code to your email</p>
            <form action="">
                <button type="submit">Submit</button>
            </form>
            <p>Didn't received the code? <button type="button">Resend OTP</button></p>
        </div>
        <div>
            <h1>Change Password</h1>
            <form action="">
                <label htmlFor="NewPass">New Password</label>
                <input type='password' name='npass' id='npass'/>
                <label htmlFor="ConfirmPass">Confirm Password</label>
                <input type="password" name="cpass" id="cpass" />
                <button type="submit">Reset Password</button>
            </form>
        </div>


    </div>
  )
}

export default Otp
