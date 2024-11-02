import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Button, Popconfirm, message } from "antd";
import dayjs from "dayjs";

const Rentlist = () => {
  const [allRents, setAllRents] = useState([]);
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rents/user-rent-details/");
        setAllRents(response.data.rentDetails);
        setRents(response.data.rentDetails);
      } catch (err) {
        setError("Error fetching rent details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentDetails();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    if (searchTerm === "") {
      setRents(allRents);
    } else {
      const filteredRents = allRents.filter(
        (rent) =>
          rent.renterID.firstname.toLowerCase().includes(searchTerm) ||
          rent.renterID.lastname.toLowerCase().includes(searchTerm) ||
          `${rent.renterID.firstname} ${rent.renterID.lastname}`
            .toLowerCase()
            .includes(searchTerm)
      );
      setRents(filteredRents);
    }
  };

  const deleteRentDetails = async (rentId, carId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/rent/delete-rent-details/${rentId}`
      );
      message.success(response.data.message);

      await axios.put(`http://localhost:3000/api/updatecar/${carId}`, {
        status: true,
      });

      setRents((prevRents) => prevRents.filter((rent) => rent._id !== rentId));
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error || "Error deleting rent details.");
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  const handleRentClick = (rentId) => {
    localStorage.setItem("rentId", rentId);
    navigate(`/admin/rent/details/${rentId}`);
  };

  const columns = [
    {
      title: "Renter",
      dataIndex: "renterID",
      key: "renter",
      render: (renter) => `${renter.firstname} ${renter.lastname}`,
      sorter: (a, b) => a.renterID.firstname.localeCompare(b.renterID.firstname),
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
      sorter: (a, b) => a.carID.price - b.carID.price,
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
      <br />
      <label>Search Renter:</label>
      <Input
        placeholder="Search by renter's name"
        value={search}
        onChange={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={rents}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
    </div>
  );
};

export default Rentlist;
