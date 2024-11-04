import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag ,Avatar} from 'antd';
import { TbManualGearboxFilled, TbAirConditioning } from "react-icons/tb";
import { Link } from 'react-router-dom';
import './CarList.css';
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer';
import Head from '../../Head';
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cars');
                setCars(response.data.map(car => ({ ...car, key: car._id })));
            } catch (err) {
                setError('Error fetching cars. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const columns = [
        {
            title: 'Car ID',
            dataIndex: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
        },
        {
            title: 'Car Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Avatar shape="square" src={`http://localhost:3000/api/car_img/${image}`} alt="User Avatar" />
              ),
        },
        {
            title: 'Car Name',
            dataIndex: 'car_name',
            sorter: (a, b) => a.car_name.localeCompare(b.car_name),
        },
        {
            title: 'Price (₱)',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Transmission',
            dataIndex: 'transmission',
            sorter: (a, b) => a.transmission.localeCompare(b.transmission),
            render: (text) => (
                <span>
                    <TbManualGearboxFilled /> {text}
                </span>
            ),
        },
        {
            title: 'Air Conditioning',
            dataIndex: 'air_conditioning',
            render: () => (
                <span>
                    <TbAirConditioning /> Air Conditioner
                </span>
            ),
        },
        {
            title: 'Body Type',
            dataIndex: 'body_type',
            filters: [
                { text: 'Sedan', value: 'Sedan' },
                { text: 'Hatchback', value: 'Hatchback' },
                { text: 'SUV', value: 'SUV' },
                { text: 'Crossover', value: 'Crossover' },
                { text: 'Coupe', value: 'Coupe' },
                { text: 'Convertible', value: 'Convertible' },
                { text: 'Pickup Truck', value: 'Pickup Truck' },
                { text: 'Station Wagon', value: 'Station Wagon' },
                { text: 'Luxury Car', value: 'Luxury Car' },
            ],
            onFilter: (value, record) => record.body_type === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag color={status ? 'green' : 'volcano'}>
                    {status ? 'Available' : 'Unavailable'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            render: (_, car) => (
                <Link
                    to="/admin/car/detail"
                    onClick={() => localStorage.setItem('carId', car._id)}
                >
                    View Details
                </Link>
            ),
        },
    ];

    const rowClassName = (record) => (!record.status ? 'carlist-row-unavailable' : '');

    return (
        <div className="carlist-main-container">
            <Head title="List of Cars"/>
            <Header/>
            <div className="carlists-container">
                <h1 className="carlist-title">Select a vehicle group</h1>
                
                <Table
                    columns={columns}
                    dataSource={cars}
                    loading={loading}
                    rowClassName={rowClassName}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: true }}
                    style={{ marginTop: '20px' }}
                />
            </div>
        </div>
    );
};

export default CarList;
