import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Avatar, Button, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../../Head';

const Userlist = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setAllUsers(response.data);
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/api/user/delete/${userId}`);
          setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
          setAllUsers((prevAllUsers) => prevAllUsers.filter(user => user._id !== userId));
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
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm)
      );
      setUsers(filteredUsers);
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
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
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
      <Head title="List of Users"/>
      <br />
      <label htmlFor="search">Search User: </label>
      <Input
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Userlist;
