import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, InputNumber, Button, Form, message } from 'antd';

const AddRent = () => {
    const id = localStorage.getItem("id") || 'ID Not Found';
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [daysAvailability, setDaysAvailability] = useState(); 
    const navigate = useNavigate();
    const [cities, setCity] = useState([]);


    const handleSubmit = async (values) => {
        try {
            localStorage.setItem('pickup', values.pickup);
            localStorage.setItem('dropoff', values.dropoff);
            localStorage.setItem('daysAvailability', values.daysAvailability);
            navigate("/admin/search/rent");
            message.success('Start Searching!'); // Success message
        } catch (err) {
            console.error('Error saving data:', err);
            message.error('Failed to save data.'); // Error message
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto' }}>
           <Form
            layout="vertical"
            onFinish={handleSubmit}
        >
            {/* Pick Up Location */}
            <Form.Item
                label="Pick Up Location"
                name="pickup"
                rules={[{ required: true, message: 'Please enter pick-up location' }]}
            >
                <Input placeholder="Enter pick-up" onChange={(e) => setPickup(e.target.value)} />
            </Form.Item>

            {/* Drop Off Location */}
            <Form.Item
                label="Drop Off Location"
                name="dropoff"
                rules={[{ required: true, message: 'Please enter drop-off location' }]}
            >
                <Input placeholder="Enter drop-off" onChange={(e) => setDropoff(e.target.value)} />
            </Form.Item>

            {/* Days Availability */}
            <Form.Item
                label="Days Available"
                name="daysAvailability"
                rules={[{ required: true, message: 'Please enter the number of available days' }]}
            >
                <InputNumber 
                    min={1}
                    placeholder="Enter the number of available days (e.g., 5)"
                    onChange={(value) => setDaysAvailability(value)} 
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Book Now
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
}

export default AddRent;
