import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import './Error.css'
import Head from '../Head';

const Error500 = () => (
  <>
  <Head title="You need to Login First"/>
  <Result
    status="500"
    title="500"
    subTitle="Sorry, but you need to log in first."
    extra={<Link to="/login">
        <Button className='error' type="primary">Click to Log In</Button>
      </Link>}
  />
  </>
  
);
export default Error500;