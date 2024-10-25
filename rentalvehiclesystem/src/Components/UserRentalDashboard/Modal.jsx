import React from 'react';
import './Modal.css'; // Make sure to create this CSS file for styling

const Modal = ({ isActive, details, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="content">
        <h1>Car Details</h1>
        {details.map((info) => (
          <div key={info._id}>
            <h1>Personal Details</h1>   
            <h2>First Name: {info.renterID.firstname}</h2>
            <h2>Last Name: {info.renterID.lastname} <span>Suffix: {info.renterID.suffix}</span></h2>
            <h2>Gender: {info.renterID.gender}</h2>
            <h2>Birthday: {info.renterID.birthday}</h2>
            <h2>Address: {info.renterID.address.street} {info.renterID.address.city}, {info.renterID.address.state}</h2>
            <h2>Car: {info.carID.car_name}</h2>
            <h2>Pick Up: {info.carID.pickup} <span>Drop Off: {info.carID.dropoff}</span></h2>
            <h2>Pick up date: {info.pickUpDate}</h2>
            <h2>Days: {info.carID.days_availability} <span>Price: {info.carID.price}</span></h2>
            <br />
            <h1>Specifications</h1>
            <div className='Specifications'>
                <img src={`http://localhost:3000/api/car_img/${info.carID.image}`} alt='Rented Car' />
                <h2>Body type: {info.carID.body_type} <br /> Seat Capacity: {info.carID.seats} <br />Transmission: {info.carID.transmission}</h2>
            </div>
            
          </div>
        ))}
        <div className='close-cont'>
        <button className='close'    onClick={onClose}>Close</button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
