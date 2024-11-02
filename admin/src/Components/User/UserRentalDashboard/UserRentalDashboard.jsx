import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import dayjs from 'dayjs';

const UserRentalDashboard = () => {
    const userId = localStorage.getItem('userId');
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rentDetail, setRentDetail] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/user-rent-details/${userId}`);
                setRents(Array.isArray(response.data.rentDetails) ? response.data.rentDetails : []);
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

    const viewDetails = (rent) => {
        setRentDetail(rent);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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
            title: "Pick Up",
            dataIndex: "carID",
            key: "pickup",
            render: (car) => car.pickup,
        },
        {
            title: "Drop Off",
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
                        <Button type="link" danger>Cancel</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>User Rental Dashboard</h1>
            {error ? <div>{error}</div> : (
                <Table
                    columns={columns}
                    dataSource={rents}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            )}

            {rentDetail && (
                <Modal
                    title="Rent Details"
                    visible={isModalVisible}
                    onCancel={closeModal}
                    footer={[
                        <Button key="close" onClick={closeModal}>
                            Close
                        </Button>,
                        <Link to={`/update/rent/${rentDetail._id}`} key="update">
                            <Button type="primary">Update</Button>
                        </Link>,
                    ]}
                >
                    <h2>Personal Details</h2>
                    <p>First Name: {rentDetail.renterID.firstname} Last Name: {rentDetail.renterID.lastname}</p>
                    <p>Suffix: {rentDetail.renterID.suffix} Gender: {rentDetail.renterID.gender}</p>
                    <p>Birthday: {rentDetail.renterID.birthday}</p>
                    <p>Address: {rentDetail.renterID.address.street}, {rentDetail.renterID.address.city}, {rentDetail.renterID.address.state}</p>

                    <h2>Car Details</h2>
                    <p>Car: {rentDetail.carID.car_name}</p>
                    <p>Pick Up: {rentDetail.carID.pickup}</p>
                    <p>Drop Off: {rentDetail.carID.dropoff}</p>
                    <p>Days Available: {rentDetail.carID.days_availability} Price: ${rentDetail.carID.price}</p>
                    <p>Pick up date: {rentDetail.pickUpDate}</p>

                    <h2>Specifications</h2>
                    <img
                        src={`http://localhost:3000/api/car_img/${rentDetail.carID.image}`}
                        alt="Rented Car"
                        style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }}
                    />
                    <p>Body Type: {rentDetail.carID.body_type}</p>
                    <p>Seat Capacity: {rentDetail.carID.seats}</p>
                    <p>Transmission: {rentDetail.carID.transmission}</p>
                </Modal>
            )}
        </div>
    );
};

export default UserRentalDashboard;
