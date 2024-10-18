import React from 'react'

const SearchCar = () => {
    const searchedCars = localStorage.getItem("searchedcars");
    
    console.log(searchedCars); 
  return (
    <div>
       <h1>Car Listings</h1>
         
    </div>
  )
}

export default SearchCar
