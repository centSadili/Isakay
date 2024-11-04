import React, { useState } from "react";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, message, Col, Row, Button, Input, Select } from "antd";
import { useMediaQuery } from 'react-responsive';
import Head from "../../Head";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddCar = () => {
  const seatOptions = {
    Sedan: 5,
    Hatchback: 5,
    SUV: 7,
    Crossover: 5,
    Coupe: 4,
    Convertible: 4,
    "Pickup Truck": 5,
    "Station Wagon": 5,
    "Luxury Car": 2,
  };

  const [formData, setFormData] = useState({
    car_name: "",
    body_type: "Sedan",
    seats: seatOptions["Sedan"],
    transmission: "manual",
    pickup: "",
    dropoff: "",
    price: "",
    days_availability: "",
    image: null,
  });

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const basePricePerDay = {
    Sedan: 550,
    Hatchback: 620,
    SUV: 705,
    Crossover: 715,
    Coupe: 819,
    Convertible: 945,
    "Pickup Truck": 780,
    "Station Wagon": 985,
    "Luxury Car": 1200
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const preview = await getBase64(file);
      setFormData({ ...formData, image: file });
      setPreviewImage(preview);
    } else {
      setFormData({ ...formData, image: null });
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === "body_type") {
      updatedFormData.seats = seatOptions[value] || "";
    }

    if (name === "body_type" || name === "days_availability") {
      const days = updatedFormData.days_availability || 0;
      const basePrice = basePricePerDay[updatedFormData.body_type] || 0;
      updatedFormData.price = basePrice * days;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (
        window.confirm(
          `Are you sure you want to add this car: ${formData.car_name}?`
        )
      ) {
        const response = await axios.post(
          "http://localhost:3000/api/car/submit-car",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.success(response.data.message);

        setFormData({
          car_name: "",
          body_type: "Sedan",
          seats: seatOptions["Sedan"],
          transmission: "manual",
          pickup: "",
          dropoff: "",
          price: "",
          days_availability: "",
          image: null,
        });
        setFileList([]);
        setPreviewImage("");
      }
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message
        : "Error adding car listing.";
      message.error("All fields are REQUIRED");
      console.log(errorMsg)
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const cardContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    width: '90%',
    margin: '0 auto',
    padding: isMobile ? '15px' : '30px',
    borderRadius: '12px',
    gap: '20px',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const imageContainerStyle = {
    flex: isMobile ? '100%' : '3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '12px',
  };
  
  return (
    <div>
      <Head title="Add Car"/>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Car Details Form</h2>
      <div style={cardContainerStyle}>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <Row gutter={16} style={{ alignItems: "center" }}>
            {/* Car Image and Details Section */}
            <Col span={12}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                required
                maxCount={1}
              >
                {fileList.length < 1 && uploadButton}
              </Upload>
  
              <label htmlFor="car_name">Car Name:</label>
              <Input
                type="text"
                id="car_name"
                name="car_name"
                value={formData.car_name}
                onChange={handleFieldChange}
                required
              />
  
              <label htmlFor="body_type">Body Type:</label>
              <Select
                id="body_type"
                name="body_type"
                value={formData.body_type}
                onChange={(value) => setFormData({ ...formData, body_type: value })}
                required
                style={{ width: "100%" }}
              >
                {Object.keys(seatOptions).map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
  
              <label htmlFor="seats">Seats:</label>
              <Input
                type="number"
                id="seats"
                name="seats"
                value={formData.seats}
                readOnly
                required
              />
  
              <label htmlFor="transmission">Transmission:</label>
              <Select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={(value) => setFormData({ ...formData, transmission: value })}
                required
                style={{ width: "100%" }}
              >
                <Option value="manual">Manual</Option>
                <Option value="automatic">Automatic</Option>
              </Select>
            </Col>
  
            {/* Location & Availability Section */}
            <Col span={12}>
              <label htmlFor="pickup">Pick Up Location:</label>
              <Input
                type="text"
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleFieldChange}
                required
              />
  
              <label htmlFor="dropoff">Drop Off Location:</label>
              <Input
                type="text"
                id="dropoff"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleFieldChange}
                required
              />
  
              <label htmlFor="days_availability">Days Available:</label>
              <Input
                type="number"
                id="days_availability"
                name="days_availability"
                value={formData.days_availability}
                onChange={handleFieldChange}
                min={'1'}
                required
              />
            </Col>
          </Row>
  
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="price">Price (in ₱):</label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              readOnly
              style={{ width: "100%" }}
            />
          </div>
  
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
  
        {/* Image Preview Section */}
        {previewImage && (
          <div style={imageContainerStyle}>
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

export default AddCar;
