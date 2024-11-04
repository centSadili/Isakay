import React, { useState } from "react";
import axios from "axios";
import { Upload, Button, Input, Checkbox, message, Row, Col, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Head from "../../Head";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: false,
  });
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCheckboxChange = () => {
    setData({ ...data, admin: !data.admin });
  };

  const handleImageChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const preview = await getBase64(file);
      setImage(file);
      setPreviewImage(preview);
    } else {
      setImage(null);
      setPreviewImage("");
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const warning = data.admin
        ? `Are you sure to add this user as Admin: ${data.firstName}`
        : `Are you sure to add this user: ${data.firstName}`;
      if (window.confirm(warning)) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append("image", image);

        const url = "http://localhost:3000/api/registerUser";
        const { data: res } = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        message.success(res.message);
        setData(
            {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: false,
              }
        )
        setPreviewImage(null);
        setImage(null);
        setPreviewOpen(false);
        setFileList([]); 
      }
    } catch (error) {
      const errorMsg = error.response?.data.message || "Error signing up.";
      setError(errorMsg);
      message.error(errorMsg);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  const formContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    width: "90%",
    margin: "0 auto",
    padding: isMobile ? "15px" : "30px",
    borderRadius: "12px",
    gap: "20px",
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <div>
      <Head title="Sign Up"/>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up Here!</h2>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleImageChange}
                maxCount={1}
              >
                {fileList.length < 1 && uploadButton}
              </Upload>

              <label>First Name:</label>
              <Input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
              />

              <label>Last Name:</label>
              <Input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
              />

              <label>Email:</label>
              <Input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />

              <label>Password:</label>
              <Input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />

              <Checkbox checked={data.admin} onChange={handleCheckboxChange}>
                Admin
              </Checkbox>
            </Col>
          </Row>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: "20px" }}>
            Sign Up
          </Button>
          
        </form>

        {previewImage && (
          <div style={{ flex: isMobile ? "100%" : "3", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              src={previewImage}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default SignUp;
