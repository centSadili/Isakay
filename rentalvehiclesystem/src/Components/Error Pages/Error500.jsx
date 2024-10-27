import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';


const Error500 = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, but you need to log in first."
    extra={<Link to="/login">
        <Button type="primary">Log in</Button>
      </Link>}
  />
);
export default Error500;