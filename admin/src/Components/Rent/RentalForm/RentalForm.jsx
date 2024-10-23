import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
const RentalForm = () => {
  const userId = localStorage.getItem('id');
  const carId = localStorage.getItem('carId');
  const price = localStorage.getItem('price');
  const [cities, setCity] = useState([]);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  useEffect(() => {
      // Fetch cities
      axios.get('https://psgc.gitlab.io/api/island-groups/luzon/cities/')
      .then((res) => {
          const cityNames = res.data.map((city, index) => ({ name: city.name, id: index })); // Add unique id with index
          setCity(cityNames.sort((a, b) => a.name.localeCompare(b.name))); // Sort and update state
      })
      .catch((error) => {
          console.error(error);
      });
  
    // Fetch countries
    axios.get('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => {
        const countryNames = res.data.map(country => country.name.official); // Collect all countries
        setCountries(countryNames.sort()); // Update state once with sorted list
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch regions
    axios.get('https://psgc.gitlab.io/api/island-groups/luzon/regions/')
      .then((res) => {
        const regionNames = res.data.map(region => region.regionName); // Collect all regions
        setRegion(regionNames.sort()); // Update state once with sorted list
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 


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
    const {
      user,
      firstname,
      middleinitial,
      lastname,
      suffix,
      gender,
      birthday,
      street,
      city,
      state,
      zipCode,
      country,
      nationality,
      email,
      phone,
      telno,
      emergencyname,
      emergencyno,
      transact_Type,
      cardHolder,
      cardNumber,
      expDate,
      cvc,
      carID,
      pickUpDate
    } = formData;

    const payload = {
      userId: user,
      firstname,
      middleinitial,
      lastname,
      suffix,
      gender,
      birthday,
      street,
      city,
      state,
      zipCode,
      country,
      nationality,
      email,
      phone,
      telno,
      emergencyname,
      emergencyno,
      amountOfPayment: price,
      transact_Type,
      cardHolder,
      cardNumber,
      expDate,
      cvc,
      carID,
      pickUpDate
    };

    try {
      const response = await axios.post('http://localhost:3000/api/rentcar/add-rent-details', payload);
      
      if (response.status === 201) {
        alert('Rent details added successfully');

         // Update the car status to 'false'
      await axios.put(`http://localhost:3000/api/updatecar/${carId}`, { status: false });

      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit rent details.');
    }
  };

  

  const labelStyle = {
    flexBasis: '30%',
    marginRight: '10px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    flexBasis: '60%',
    padding: '5px',
    marginBottom: '10px',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  };

  const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
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
          <select name="gender" value={formData.gender} onChange={handleInputChange} style={inputStyle}>
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
          <Autocomplete
            options={cities}
            renderInput={(params) => <TextField {...params} label="City" />}
            value={formData.city}
            style={inputStyle}
            onInputChange={(event, newValue) => setFormData({ ...formData, city: newValue })}
          />
        </div>

        <div style={formRowStyle}>
        <label style={labelStyle}>State:</label>
          <Autocomplete
            options={region}
            renderInput={(params) => <TextField {...params} label="State" />}
            value={formData.state}
            style={inputStyle}
            onInputChange={(event, newValue) => setFormData({ ...formData, state: newValue })}
          />
        </div>

        <div style={formRowStyle}>
          <label style={labelStyle}>Zip Code:</label>
          <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} style={inputStyle} />
        </div>

        <div style={formRowStyle}>
        <label style={labelStyle}>Country:</label>
          <Autocomplete
            options={countries}
            renderInput={(params) => <TextField {...params} label="Country"  />}
            value={formData.country}
            style={inputStyle}
            onInputChange={(event, newValue) => setFormData({ ...formData, country: newValue })}
          />
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
          <select name="transact_Type" value={formData.transact_Type} onChange={handleInputChange} style={inputStyle}>
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

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};


export default RentalForm;
