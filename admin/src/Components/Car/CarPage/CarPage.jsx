import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../../Footer/Footer';

const CarPage = () => {
  const id = localStorage.getItem("carId") || "ID Not Found"; // Get the user ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const cardContainerStyle = {
    display: "flex",
    width: "90%",
    padding: "30px",
    borderRadius: "12px",
    alignItems: "center",
  };

  const imageContainerStyle = {
    flex: "3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f7f3f0",
    borderRadius: "12px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  };

  const descriptionContainerStyle = {
    flex: "1",
    padding: "0 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "20px",
  };

  const descriptionStyle = {
    fontSize: "1rem",
    color: "#666",
    margin: "15px 0",
  };

  const priceStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  };

  const actionContainerStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#00b894",
    transition: "background-color 0.3s ease",
  };

  buttonStyle[":hover"] = {
    backgroundColor: "#00a879",
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getcar/${id}`
        );
        setCar(response.data.car);
        localStorage.setItem("price", response.data.car.price);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:3000/api/deletecar/${id}`);
        alert("Car deleted successfully");
        navigate("/admin/car/list");
      } catch (err) {
        console.error("Error deleting car:", err);
        alert("Error deleting car");
      }
    }
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Car not Found</h1>
      </div>
    );
  }
  return (
    <div>
    <div key={car._id} className="car-card" style={cardContainerStyle}>
      <div style={imageContainerStyle}>
        <img
          src={`http://localhost:3000/api/car_img/${car.image}`}
          alt={car.car_name}
          style={imageStyle}
        />
      </div>
      <div style={descriptionContainerStyle}>
        <h2 style={titleStyle}>{car.car_name}</h2>
        <p style={subtitleStyle}>by Car Rental Services</p>
        <p style={descriptionStyle}>
          Seats: {car.seats},
          <br />
          Transmission: {car.transmission}. Available for pickup at {car.pickup}{" "}
          and
          <br />
          dropoff at {car.dropoff}.
          <br />
          Days Available: {car.days_availability}.
        </p>
        <p style={priceStyle}>${car.price}</p>
      </div>
      <div style={actionContainerStyle}>
        <Link to={`/admin/car/detail/update/`}>
          <button style={buttonStyle}>Update</button>
        </Link>
        <button onClick={handleDelete} style={buttonStyle}>
          Delete
        </button>
      </div>
    </div>
    <Footer />
    </div>

  );
};

export default CarPage;
