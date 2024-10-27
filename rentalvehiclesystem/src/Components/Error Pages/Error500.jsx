import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import './Error.css'

const Error500 = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, but you need to log in first."
    extra={<Link to="/login">
        <Button type="primary">Click to Log In</Button>
      </Link>}
  />
);
export default Error500;