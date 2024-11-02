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

  const [isActive, setActive] = useState(false);
  const [rentDetail, setRentDetail] = useState(null);
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
      message.error(error.response ? error.response.data.error : 'Error deleting rent details.');
    }
  };

  const handleRentClick = (rentId) => {
    localStorage.setItem("rentId", rentId);
    navigate(`/admin/rent/details/${rentId}`);
  };

  const viewDetails = (rent) => {
    setRentDetail(rent);
    setActive(true);
  };

  const closeDetails = () => {
    setActive(false);
    setRentDetail(null);
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
          <Button type="link" onClick={() => viewDetails(rent)}>View Details</Button>
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
  const styles = {
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '600px',
      width: '100%',
      position: 'relative',
    },
    modalTitle: {
      margin: '0 0 20px',
      fontSize: '24px',
      textAlign: 'center',
    },
    sectionTitle: {
      margin: '20px 0 10px',
      fontSize: '20px',
    },
    detailsContainer: {
      margin: '5px 0',
    },
    specifications: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '10px',
    },
    imgSpec: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    clickables: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    closeButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#f44336',
      color: 'white',
    },
    viewButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    closeButtonHover: {
      backgroundColor: '#d32f2f',
    },
    viewButtonHover: {
      backgroundColor: '#388e3c',
    }
  };
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

{isActive && (
        <div style={styles.modal}>
          <div style={styles.overlay} onClick={closeDetails}></div>
          <div style={styles.content}>
            <h1 style={styles.modalTitle}>Rent Details</h1>
            {rentDetail && (
              <div key={rentDetail._id} style={styles.detailsContainer}>
                <h2 style={styles.sectionTitle}>Personal Details</h2>
                <p>First Name: {rentDetail.renterID.firstname} <span>Last Name: {rentDetail.renterID.lastname}</span></p>
                <p>Suffix: {rentDetail.renterID.suffix} <span>Gender: {rentDetail.renterID.gender}</span></p>
                <p>Birthday: {rentDetail.renterID.birthday ? new Date(rentDetail.renterID.birthday).toISOString().split("T")[0] : ""}</p>
                <p>Address: {rentDetail.renterID.address.street} {rentDetail.renterID.address.city}, {rentDetail.renterID.address.state}</p>
                <p>Pick Up: {rentDetail.carID.pickup} <span>Drop Off: {rentDetail.carID.dropoff}</span></p>
                <p>Days: {rentDetail.carID.days_availability} Day/s <span>Price: ${rentDetail.carID.price}</span></p>
                <p>Pick up date: {rentDetail.pickUpDate ? new Date(rentDetail.pickUpDate).toISOString().split("T")[0] : ""}</p>

                <h2 style={styles.sectionTitle}>Specifications</h2>
                <div style={styles.specifications}>
                  <img src={`http://localhost:3000/api/car_img/${rentDetail.carID.image}`} alt='Rented Car' style={styles.imgSpec}/>
                  <p>Car Rented: {rentDetail.carID.car_name}</p>
                  <p>Body Type: {rentDetail.carID.body_type}</p>
                  <p>Seat Capacity: {rentDetail.carID.seats}</p>
                  <p>Transmission: {rentDetail.carID.transmission}</p>
                </div>
              </div>
            )}
            <div style={styles.clickables}>
              <button
                style={styles.closeButton}
                onClick={closeDetails}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.closeButton.backgroundColor}
              >
                Close
              </button>
              <Link to={'/update/rent/' + rentDetail._id}>
                <button
                  style={styles.viewButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.viewButtonHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.viewButton.backgroundColor}
                >
                  Update
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRentalDashboard;
