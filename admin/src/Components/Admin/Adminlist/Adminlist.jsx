import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Avatar, Button, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../../Head';

const Adminlist = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        const users = response.data;
        if (users && users.length > 0) {
          const adminUsers = users.filter(user => user.admin);
          setAllAdmins(adminUsers);
          setAdmins(adminUsers);
        } else {
          setAdmins([]);
        }
      } catch (err) {
        setError('Error fetching users. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/api/user/delete/${userId}`);
          setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== userId));
          setAllAdmins((prevAllAdmins) => prevAllAdmins.filter(admin => admin._id !== userId));
          message.success('User deleted successfully');
        } catch (err) {
          console.error('Error deleting user:', err);
          message.error('Error deleting user. Please try again.');
        }
      },
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    if (searchTerm === '') {
      setAdmins(allAdmins);
    } else {
      const filteredAdmins = allAdmins.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm)
      );
      setAdmins(filteredAdmins);
    }
  };

  const handleUserClick = (userId) => {
    localStorage.setItem('userId', userId);
    navigate(`/admin/user/profile`);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Avatar src={`http://localhost:3000/api/car_img/${image}`} alt="User Avatar" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleUserClick(record._id)}>
            View Profile
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Head title="Admin List"/>
      <Link to="/admin/user/add">Sign up User</Link>
      <br />
      <label htmlFor="search">Search Admin: </label>
      <Input
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={admins}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Adminlist;
