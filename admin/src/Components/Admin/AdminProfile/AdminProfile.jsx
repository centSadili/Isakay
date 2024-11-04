// src/components/Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Upload, message, Col, Row, Button, Input, Image, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';
import Footer from '../../Footer/Footer';
import AdminRentalDashboard from '../AdminRentalDashboard/AdminRentalDashboard'
const AdminProfile = () => {
  const id = localStorage.getItem("id") || "ID Not Found"; // Get the user ID from localStorage
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null,
  });
  
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [PassMsg, contextHolder] = message.useMessage();
  const [isActive, setActive] = useState(false);
  const [loadingpass, setLoadingPass] = useState(false);
  const [passForm] = Form.useForm();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setUser({ ...user, image: file });
    } else {
      setUser({ ...user, image: null });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleCancel = () => {
    setActive(false);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        };

        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`,
          config
        );
        setUser(response.data.user ); 
        setPreviewImage(`http://localhost:3000/api/car_img/${response.data.user.image}`);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure you want to update your details?")) {
        const url = `http://localhost:3000/api/user/update/${id}`;
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        
        // Append the image if it exists
        if (user.image) {
          formData.append("image", user.image);
        }

        const res = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        message.success(res.data.message);
        setPreviewImage(`http://localhost:3000/api/car_img/${res.data.user.image}`);
        navigate("/Home");
      }
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : "Error updating profile.";
      message.error(errorMsg);
    }
  };
  const handleChangePass = (value)=>{
    setLoadingPass(true);
    
    if(value.NewPass != value.RetypeNew){
      PassMsg.open({
        type:"error",
        content:"Passwords do not match. Make sure both passwords are identical."
      })
    }
    else if(value.CurrentPass == "" || value.NewPass == "" || value.RetypeNew == ""){
      PassMsg.open({
        type:"warning",
        content:"Enter all the required fields!"
      })
    }
    else{
      console.log({CurrentPass:value.CurrentPass, NewPass:value.NewPass, email: user.email})
      axios.post('http://localhost:3000/api/user/update/changePass', {CurrentPass:value.CurrentPass, NewPass:value.NewPass, email: user.email})
    .then((res)=>{
      console.log(res.data)
      PassMsg.open({
        type:"success",
        content:res.data.message,
        duration:5
      });
      setActive(false)
    })
    .catch((err)=> {
      console.error(err)
      PassMsg.open({
        type:"error",
        content:"Error",
        duration:5
      })
    })
    .finally(()=> setLoadingPass(false));
    }
    setLoadingPass(false)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Change Image</div>
    </div>
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const cardContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    gap: '20px',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const imageContainerStyle = {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "12px",
    width: isMobile ? "100%" : "auto",
    height: isMobile ? "auto" : "400px",
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div style={{ textAlign: 'center',overflowY: 'auto',maxHeight: '80vh'}}>
      <h2>Update Profile</h2>
      <div style={cardContainerStyle}>
        <form onSubmit={handleUpdate} style={{ flex: 1 }}>
          <Row gutter={16} style={{ alignItems: "center" }}>
            <Col span={12}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length < 1 && uploadButton}
              </Upload>

              <label htmlFor="firstName">First Name:</label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="lastName">Last Name:</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                required
              />
            </Col>

            <Col span={12}>
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Row>

          {error && <div className="error">{error}</div>}

          <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
            Update
          </Button>
          <Button type="primary" htmlType="button" style={{width:"100%", marginTop: '1em'}} onClick={()=> setActive(!isActive)}>Change Password</Button>
        </form>
        {previewImage && (
          <div style={imageContainerStyle}>
            <Image
              src={previewImage} 
              alt="Profile"
              width={550} 
              height={400}
            />
          </div>
        )}
        {contextHolder}
      <Modal
      title="Change Password"
      open={isActive}
      okText="Submit"
      onCancel={handleCancel}
      okButtonProps={{htmlType:'submit'}}
      loading={loadingpass}
      destroyOnClose
      modalRender={(dom)=>
      <Form
        layout="vertical"
        form={passForm}
        name="ChangePassword"
        clearOnDestroy
        autoComplete="off"
        onFinish={handleChangePass}
        >
          {dom}
        </Form>}
    >
      <Form.Item
        name="CurrentPass"
        label="Current Password"
        rules={[{
          required:true,
          message:"Please Input your Current Password"
        }]}>
          <Input type="password" placeholder="Current Password"/>
        </Form.Item>
        <Form.Item
        name="NewPass"
        label="New Password"
        rules={[{
          required:true,
          message:"Please Input your New Password"
        }]}>
          <Input type="password" placeholder="New Password"/>
        </Form.Item>
        <Form.Item
        name="RetypeNew"
        label="Retype Your Password"
        rules={[{
          required:true,
          message:"Please retype your Password"
        }]}>
          <Input type="password" placeholder="Retype Password"/>
        </Form.Item>
    </Modal>
      </div>
     <AdminRentalDashboard/>
    </div>
  );
};

export default AdminProfile;
