import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';

const AdminRentalDashboard = () => {
  const userId = localStorage.getItem('id');
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/user-rent-details/${userId}`);
        if (Array.isArray(response.data.rentDetails)) {
          setRents(response.data.rentDetails);
        } else {
          setRents([]);
        }
      } catch (err) {
        setError('Error fetching rents. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRentDetails();
  }, [userId]);

  const deleteRentDetails = async (rentId, carId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/rent/delete-rent-details/${rentId}`);
      message.success(response.data.message);

      await axios.put(`http://localhost:3000/api/updatecar/${carId}`, { status: true });
      setRents((prevRents) => prevRents.filter((rent) => rent._id !== rentId));
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error || 'Error deleting rent details.');
      } else {
        message.error('An error occurred. Please try again.');
      }
    }
  };

  const handleRentClick = (rentId) => {
    localStorage.setItem("rentId", rentId);
    navigate(`/admin/rent/details/${rentId}`);
  };

  const columns = [
    {
      title: "Renter Name",
      dataIndex: "renterID",
      key: "renterName",
      render: (renter) => `${renter.firstname} ${renter.lastname}`,
    },
    {
      title: "Car",
      dataIndex: "carID",
      key: "car",
      render: (car) => car.car_name,
    },
    {
      title: "Pick Up Location",
      dataIndex: "carID",
      key: "pickup",
      render: (car) => car.pickup,
    },
    {
      title: "Drop Off Location",
      dataIndex: "carID",
      key: "dropoff",
      render: (car) => car.dropoff,
    },
    {
      title: "Pick Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Days Available",
      dataIndex: "carID",
      key: "days_availability",
      render: (car) => car.days_availability,
    },
    {
      title: "Price",
      dataIndex: "carID",
      key: "price",
      render: (car) => `$${car.price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, rent) => (
        <div>
          <Button type="link" onClick={() => handleRentClick(rent._id)}>
            View Details
          </Button>
          <Popconfirm
            title="Are you sure you want to cancel this rent?"
            onConfirm={() => deleteRentDetails(rent._id, rent.carID._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Cancel
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Rental Dashboard</h1>
      {rents.length > 0 ? (
        <Table
          columns={columns}
          dataSource={rents}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <p>No rent details available.</p>
      )}
    </div>
  );
};

export default AdminRentalDashboard;
