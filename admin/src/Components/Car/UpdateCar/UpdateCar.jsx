import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Col, Row, Button, Input, Select,Image } from "antd";
import { useMediaQuery } from 'react-responsive';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header'
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UpdateCar = () => {
  const id = localStorage.getItem("carId") || 'ID Not Found';

  const seatOptions = {
    Sedan: 5,
    Hatchback: 5,
    SUV: 7,
    Crossover: 5,
    Coupe: 5,
    Convertible: 4,
    'Pickup Truck': 5,
    'Station Wagon': 5,
    'Luxury Car': 2,
  };

  const basePricePerDay = {
    Sedan: 550,
    Hatchback:620,
    SUV: 705,
    Crossover: 715,
    Coupe: 819,
    Convertible: 945,
    'Pickup Truck': 780,
    'Station Wagon': 985,
    'Luxury Car': 1200,
  };

  const [formData, setFormData] = useState({
    car_name: '',
    body_type: 'Sedan',
    seats: seatOptions['Sedan'],
    status: '',
    transmission: 'manual',
    pickup: '',
    dropoff: '',
    price: '',
    status:'Available',
    days_availability: '',
    image: null,
  });

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  // Fetch existing car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getcar/${id}`);
        const car = response.data.car;
        setFormData({
          car_name: car.car_name,
          body_type: car.body_type,
          seats: car.seats,
          status: car.status ? 'Available' : 'Rented',
          transmission: car.transmission,
          pickup: car.pickup,
          dropoff: car.dropoff,
          price: car.price,
          days_availability: car.days_availability,
          image: car.image,
        });
        setPreviewImage(`http://localhost:3000/api/car_img/${car.image}`);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const preview = await getBase64(file);
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === 'body_type') {
      updatedFormData.seats = seatOptions[value] || '';
    }
    if (name === 'body_type' || name === 'days_availability') {
      const days = updatedFormData.days_availability || 0;
      const basePrice = basePricePerDay[updatedFormData.body_type] || 0;
      updatedFormData.price = basePrice * days;
    }
    if(name === 'status'){
      updatedFormData.status = value === 'Available' ? true : false;
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
          `Are you sure you want to update this car: ${formData.car_name}?`
        )
      ) {
        const response = await axios.put(`http://localhost:3000/api/updatecar/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPreviewImage(`http://localhost:3000/api/car_img/${response.data.car.image}`);
      message.success(response.data.message);}
      
      
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : 'Error updating car listing.';
      message.error(errorMsg);
    }
  };

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
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Header/>
      <h2>Update Car Details</h2>
      <div style={cardContainerStyle}>
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
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
                onChange={(value) => handleFieldChange({ target: { name: 'body_type', value } })} // Modified this line
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
            </Col>

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
                min={1}
                required
              />
            </Col>
            <label htmlFor="status">Status:</label>
            <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={(value) => handleFieldChange({ target: { name: 'status', value } })} // Modified this line
            required
            style={{ width: "100%" }}
          >
            <Option value="Available">Available</Option>
            <Option value="Rented">Rented</Option>
          </Select>

          </Row>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="price">Price (in ₱):</label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              readOnly
              style={{ width: '100%' }}
            />
          </div>

          <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
            Update
          </Button>
        </form>
        {previewImage && (
          <div style={imageContainerStyle}>
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
              src={previewImage}
              alt={formData.car_name}
              width={550} 
              height={400}
            />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateCar;
