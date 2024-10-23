import React, { useState } from 'react';
import axios from 'axios';

const RentalForm = () => {
  const userId = localStorage.getItem('id');
  const carId = localStorage.getItem('carId');
  const price = localStorage.getItem('price');

  const [formData, setFormData] = useState({
    user: userId,
    firstname: '',
    middleinitial: '',
    lastname: '',
    suffix: '',
    gender: 'Male',
    birthday: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    nationality: '',
    email: '',
    phone: '',
    telno: '',
    emergencyname: '',
    emergencyno: '',
    transact_Type: 'Visa',
    cardHolder: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
    carID: carId,
    pickUpDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amountOfPayment: price
    };

    try {
      const response = await axios.post('http://localhost:3000/api/rentcar/add-rent-details', payload);
      
      if (response.status === 201) {
        alert('Rent details added successfully');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit rent details.');
    }
  };

  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    marginBottom: '50%',
    padding: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    maxHeight: '1700px', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
  };

  const labelStyle = {
    flex: '1', 
    fontWeight: 'bold',
    textAlign: 'right', 
    marginRight: '10px',
  };

  const inputStyle = {
    flex: '2', 
    padding: '5px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center', 
    width: '100%', 
  };

  const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%', 
  };

  const headerStyle = {
    marginLeft: '120px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const buttonStyle = {
    padding: '10px 5px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '80%',
    alignSelf: 'center', 
    justifyContent: 'center',
    marginLeft: '75px',
    marginBottom:'20px',
  };

  return (
    
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <div style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <h1 style={headerStyle}>Personal Details</h1>
          <div style={formRowStyle}>
            <label style={labelStyle}>First Name:</label>
            <input type="text" name="firstname" required value={formData.firstname} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Middle Name:</label>
            <input type="text" name="middleinitial" value={formData.middleinitial} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Last Name:</label>
            <input type="text" name="lastname" required value={formData.lastname} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Suffix:</label>
            <input type="text" name="suffix" value={formData.suffix} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} style={{ ...inputStyle, flex: '2' }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Birthday:</label>
            <input type="date" name="birthday" required value={formData.birthday} onChange={handleInputChange} style={inputStyle} />
          </div>

          <legend style={headerStyle}>Address</legend>

          <div style={formRowStyle}>
            <label style={labelStyle}>Street:</label>
            <input type="text" name="street" required value={formData.street} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>City:</label>
            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>State:</label>
            <input type="text" name="state" required value={formData.state} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Zip Code:</label>
            <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Country:</label>
            <input type="text" name="country" required value={formData.country} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Nationality:</label>
            <input type="text" name="nationality" required value={formData.nationality} onChange={handleInputChange} style={inputStyle} />
          </div>

          <h1 style={headerStyle}>Contact Details</h1>
          <div style={formRowStyle}>
            <label style={labelStyle}>Email:</label>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Phone:</label>
            <input type="tel" name="phone" maxLength="10" required value={formData.phone} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Telephone:</label>
            <input type="tel" name="telno" maxLength="8" required value={formData.telno} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Emergency Contact Name:</label>
            <input type="text" name="emergencyname" required value={formData.emergencyname} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Emergency Contact Number:</label>
            <input type="tel" name="emergencyno" maxLength="10" required value={formData.emergencyno} onChange={handleInputChange} style={inputStyle} />
          </div>

          <h1 style={headerStyle}>Payment Details</h1>
          <div style={formRowStyle}>
            <label style={labelStyle}>Price:</label>
            <input type="number" name="amountOfPayment" value={price} readOnly required style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Payment Method:</label>
            <select name="transact_Type" value={formData.transact_Type} onChange={handleInputChange} style={{ ...inputStyle, flex: '2' }}>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Paymaya">Paymaya</option>
            </select>
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Card Holder:</label>
            <input type="text" name="cardHolder" required value={formData.cardHolder} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Card Number:</label>
            <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Expiration Date:</label>
            <input type="date" name="expDate" required value={formData.expDate} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>CVC:</label>
            <input type="number" name="cvc" maxLength="3" required value={formData.cvc} onChange={handleInputChange} style={inputStyle} />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>PickUp Date:</label>
            <input type="date" name="pickUpDate" required value={formData.pickUpDate} onChange={handleInputChange} style={inputStyle} />
          </div>

          <button type="submit" style={buttonStyle}>
            Book now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;
