import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import './UpdateForm.css';  
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const UpdateRentDetailsForm = () => {
  const { id } = useParams();
  const [rentDetail, setRentDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCity] = useState([]);
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);

  const [formData, setFormData] = useState({
    firstname: "",
    middleinitial: "",
    lastname: "",
    suffix: "",
    gender: "Male",
    birthday: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    nationality: "",
    email: "",
    phone: "",
    telno: "",
    emergencyname: "",
    emergencyno: "",
    transact_Type: "Visa",
    cardHolder: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    pickUpDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get("https://psgc.gitlab.io/api/island-groups/luzon/cities/")
      .then((res) => {
        const cityNames = res.data.map((city) => ({
          name: city.name,
          id: city.code || city.geonameId || city.id || city.name,
        }));
        setCity(cityNames.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((error) => console.error(error));

    axios.get("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => {
        const countryNames = res.data.map((country) => country.name.official);
        setCountries(countryNames.sort());
      })
      .catch((error) => console.error(error));

    axios.get("https://psgc.gitlab.io/api/island-groups/luzon/regions/")
      .then((res) => {
        const regionNames = res.data.map((region) => region.regionName);
        setRegion(regionNames.sort());
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rents/get-rent/" + id);
        setRentDetails(response.data);
        setFormData({
          firstname: response.data?.rentDetails?.renterID?.firstname || "",
          middleinitial: response.data?.rentDetails?.renterID?.middleinitial || "",
          lastname: response.data?.rentDetails?.renterID?.lastname || "",
          suffix: response.data?.rentDetails?.renterID?.suffix,
          gender: response.data?.rentDetails?.renterID?.gender,
          birthday: response.data?.rentDetails?.renterID?.birthday,
          street: response.data?.rentDetails?.renterID?.address?.street,
          city: response.data?.rentDetails?.renterID?.address?.city,
          state: response.data?.rentDetails?.renterID?.address?.state,
          zipCode: response.data?.rentDetails?.renterID?.address?.zipCode,
          country: response.data?.rentDetails?.renterID?.address?.country,
          nationality: response.data?.rentDetails?.renterID?.nationality,
          email: response.data?.contactDetail?.email,
          phone: response.data?.contactDetail?.phone,
          telno: response.data?.contactDetail?.telno,
          emergencyname: response.data?.contactDetail?.emergency?.emergencyname,
          emergencyno: response.data?.contactDetail?.emergency?.emergencyno,
          transact_Type: response.data?.rentDetails?.transactionID?.transact_Type,
          cardHolder: response.data?.rentDetails?.transactionID?.cardHolder,
          cardNumber: response.data?.rentDetails?.transactionID?.cardNumber,
          expDate: response.data?.rentDetails?.transactionID?.expDate,
          cvc: response.data?.rentDetails?.transactionID?.cvc,
          pickUpDate: response.data?.rentDetails?.pickUpDate,
        });
      } catch (err) {
        setError("Error fetching rents. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (window.confirm("Are you sure you want to Update your rental booking? This action cannot be undone.")){
        const url = `http://localhost:3000/api/rent/update-rent-details/${id}`
        const res = await axios.put(url,formData)
        
        console.log(res);
      }
      
    }catch(err){
      console.log(err)
    }
   
  };

  return (
    <div className="update-container">
      <Header></Header>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Personal Details</h1>
        <div className="names">
          <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} />
          </div>
        

        <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} />
        </div>
        
        </div>

        <div className="names">

            <div>
            <label htmlFor="middleInitial">Middle Initial:</label>
                    <input type="text" name="middleinitial" maxLength="2" value={formData.middleinitial} onChange={handleInputChange} />

            </div>
       
        
          <div>
          <label htmlFor="suffix">Suffix:</label>
          <input type="text" name="suffix" value={formData.suffix} onChange={handleInputChange} />  
          </div>
        

        </div>
        
      <div className="name">
        <div>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        </div>

        <div>
        <label>Birthday:</label>
        <input type="date" name="birthday" value={formData.birthday ? new Date(formData.birthday).toISOString().split("T")[0] : ""} onChange={handleInputChange} />

        </div>
      

      </div>
      <br />

      <h1>Address</h1>

      <div className="names">
            <div>
            <label>Street:</label>
        <input type="text" name="street" value={formData.street} onChange={handleInputChange} />

        <label>City:</label>
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="City" />}
          value={cities.find((city) => city.name === formData.city) || null}
          onChange={(event, newValue) => setFormData({ ...formData, city: newValue ? newValue.name : "" })}
        />
            </div>


            <div>
            <label>State:</label>
        <Autocomplete
          options={region}
          renderInput={(params) => <TextField {...params} label="State" />}
          value={formData.state}
          onChange={(event, newValue) => setFormData({ ...formData, state: newValue || "" })}
        />
            </div>



      </div>
        

       

        

       

        

        <label>Country:</label>
        <Autocomplete
          options={countries}
          renderInput={(params) => <TextField {...params} label="Country" />}
          value={formData.country}
          onChange={(event, newValue) => setFormData({ ...formData, country: newValue || "" })}
        />

        <label>Zip Code:</label>
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />

        <label>Nationality:</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} />

        <h1>Contact Details</h1>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />

        <label>Telephone:</label>
        <input type="tel" name="telno" value={formData.telno} onChange={handleInputChange} />

        <label>Emergency Contact Name:</label>
        <input type="text" name="emergencyname" value={formData.emergencyname} onChange={handleInputChange} />

        <label>Emergency Contact Number:</label>
        <input type="tel" name="emergencyno" value={formData.emergencyno} onChange={handleInputChange} />

        <h1>Payment Details</h1>
        <label>Card Holder:</label>
        <input type="text" name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} readOnly/>

        <label>Card Number:</label>
        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} readOnly/>

        <label>Expiration Date:</label>
        <input type="date" name="expDate" value={formData.expDate} onChange={handleInputChange} readOnly/>

        <label>CVC:</label>
        <input type="number" name="cvc" value={formData.cvc} onChange={handleInputChange} readOnly/>

        <label>Pick Up Date:</label>
        <input type="date" name="pickUpDate" value={formData.pickUpDate ? new Date(formData.pickUpDate).toISOString().split("T")[0] : ""} onChange={handleInputChange} readOnly/>


        <label>Price:</label>
        <input
          type="number"
          name="amountOfPayment"
          value={rentDetail?.rentDetails?.carID?.price}
          onChange={handleInputChange}
          readOnly
          required
        />
        <button type="submit">Update</button>
      </form>
      </div>  

      <Footer></Footer>
      
    </div>
  );
};

export default UpdateRentDetailsForm;
