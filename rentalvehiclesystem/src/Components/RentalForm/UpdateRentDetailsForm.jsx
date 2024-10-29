import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const UpdateRentDetailsForm = () => {
  const { id } = useParams();
  const [rentDetail, setRentDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cities, setCity] = useState([]);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);

  useEffect(() => {
    axios.get('https://psgc.gitlab.io/api/island-groups/luzon/cities/')
    .then((res) => {
      const cityNames = res.data.map((city) => ({
        name: city.name,
        id: city.code || city.geonameId || city.id || city.name // Use a unique property if available
      }));
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

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rents/get-rent/' + id);
        setRentDetails(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Error fetching rents. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRent();
  }, [id]);

  return (
    <div>
      <form>
      <h1>Personal Details</h1>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" value={rentDetail?.renterID?.firstname || ''}  />

        <label htmlFor="middleInitial">Middle Initial:</label>
        <input type="text" maxLength='2'value={rentDetail?.renterID?.middleinitial || ''}  />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" value={rentDetail?.renterID?.lastname || ''}  />
        
        <label htmlFor="lastName">Suffix:</label>
        <input type="text" value={rentDetail?.renterID?.suffix || ''}  />

        <label htmlFor="gender">Gender:</label>
        <select value={rentDetail?.renterID?.gender || ''} >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label >Birthday:</label>
        <input
          type="date"
          name="birthday"
          required
          value={rentDetail?.renterID?.birthday ? new Date(rentDetail?.renterID?.birthday).toISOString().split("T")[0] : ""}
        />

      <h1>Address</h1>

      <label>Street:</label>
      <input
        type="text"
        name="street"
        required
        value={rentDetail?.renterID?.address?.street || ""}
      />

      <label>City:</label>
      <Autocomplete
      options={cities}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name || '')}
      renderInput={(params) => <TextField {...params} label="City" />}
      value={rentDetail?.renterID?.address?.city ? cities.find(city => city.name === rentDetail?.renterID?.address?.city) : null}
      getoptionselected={(option, value) => option.name === value.name}
      key={cities.id}

    />

    <label>State:</label>
    <Autocomplete
            options={region}
            renderInput={(params) => <TextField {...params} label="State" />}
            value={rentDetail?.renterID?.address?.state ?region.find(reg => reg.name === rentDetail?.renterID?.address?.state) : null}
          />
    
    <label>Country:</label>
    <Autocomplete
            options={countries}
            renderInput={(params) => <TextField {...params} label="Country"  />}
            value={rentDetail?.renterID?.address?.country}
           />
    <label>Zip Code:</label>
    <input 
    type="text" 
    name="zipCode" 
    required 
    value={rentDetail?.renterID?.address?.zipCode}
      />
    <label>Nationality:</label>
    <input 
    type="text" 
    name="nationality" 
    required 
    value={rentDetail?.renterID?.nationality}
    />
{/* <h1>Contact Details</h1>
<label style={labelStyle}>Email:</label>
          <input 
          type="email" 
          name="email" 
          required 
          value={formData.email}
          /> */}
      </form>
    </div>
  );
};

export default UpdateRentDetailsForm;
