import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  DesktopOutlined,
  CarOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, theme, Grid } from 'antd';
import AdminProfile from '../Admin/AdminProfile/AdminProfile'

//Cars
import Carlist from '../Car/CarList/CarList'
import AddCar from '../Car/AddCar/AddCar'

//Users
import Userlist from '../User/Userlist/Userlist'

//Rents
import Rentlist from '../Rent/Rentlist/Rentlist'
import AddRent from '../Rent/AddRent/AddRent'

//Admin
import Adminlist from '../Admin/Adminlist/Adminlist'
import Signup from '../User/Signup/SignUp'
import Footer from '../Footer/Footer';

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const Profile = () => <AdminProfile/>;
const Cars = () => <Carlist/>;
const AddCars = () => <AddCar/>;

const Users = () => <Userlist/>;
const AddUser = () => <SignUp/>;

const Rents = () => <Rentlist/>;
const AddRents = ()=> <AddRent/>
const Admins = () => <Adminlist/>
const Home = () => {
  const id = localStorage.getItem('id') || 'ID Not Found';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedKey, setSelectedKey] = useState('profile');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        };

        const response = await axios.get(`http://localhost:3000/api/user/${id}`, config);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token,user]);

  useEffect(() => {
      setCollapsed(!screens.md);
    }, [screens]);
    
  const logOut = () => {
    if (
      window.confirm(
        `Are you sure you want to LOGOUT?`
      )
    ){
      localStorage.clear();
      setUser(null);
      navigate('/login');
    }
   
  };

  const menuItems = [
    { label: 'Profile', key: 'profile', icon: <UserOutlined /> },
    { label: 'Cars', key: 'cars', icon: <CarOutlined /> ,
      children: [
        { label: 'Car List', key: 'cars_list' },
        { label: 'Add Car', key: 'add_cars' },
      ],
    },
    { label: 'Users', key: 'users', icon: <TeamOutlined /> ,
      children: [
        { label: 'User List', key: 'user_list' },
        { label: 'Add User', key: 'add_users' },
      ],
    },
    { label: 'Admins', key: 'admins', icon: <TeamOutlined /> ,
      children: [
        { label: 'Admin List', key: 'admins_list' },
        { label: 'Add Admin', key: 'add_admins' },
      ],
    },
    { label: 'Rents', key: 'rents', icon: <DesktopOutlined /> ,
      children: [
        { label: 'Rent List', key: 'rents_list' },
        { label: 'Add Rent', key: 'add_rents' },
      ],
    },
    { label: 'Logout', key: 'logout', icon: <LogoutOutlined />, onClick: logOut },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) {
    return <div>Loading user details...</div>;
  }

  const renderContent = () => {
    switch (selectedKey) {
      case 'profile':
        return <Profile />;

      case 'cars_list':
        return <Carlist />;

      case 'add_cars':
        return <AddCars />;

      case 'user_list':
        return <Userlist />;

      case 'add_users':
        return <Signup />;

      case 'rents_list':
        return <Rentlist />;

      case 'add_rents':
        return <AddRent />;

      case 'admins_list':
        return <Adminlist />;

      case 'add_admins':
        return <Signup />;
      default:
        return <Profile />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Avatar size={64} src={`http://localhost:3000/api/car_img/${user?.image}`} alt="Profile" />
        <div style={{ color: 'white', marginTop: '8px' }}>{user?.firstName} {user?.lastName}</div>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['profile']} mode="inline" items={menuItems} onClick={(e) => setSelectedKey(e.key)} />
    </Sider>
    <Layout>
      <Header style={{ padding: screens.md ? '0 16px' : '0 8px', background: colorBgContainer }} />
      <Content style={{ margin: screens.md ? '0 16px' : '0 8px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: screens.md ? 24 : 16, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
          {renderContent()}
        </div>
      </Content>
      <Footer />
    </Layout>
  </Layout>
  );
};

export default Home;
