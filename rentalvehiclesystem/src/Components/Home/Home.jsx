import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div>
      <header>
        <nav className="navbar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#vehicles">Vehicles</a></li>
            <li><a href="#booking">Booking</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
          <div className="profile">
            <img src="https://via.placeholder.com/50" alt="Profile" />
            <span>Elijah Gundayao</span>
            <p>New User</p>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <img src="car-image.jpg" alt="Car" className="hero-image" />
          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="pickup">Pick up Address</label>
              <input type="text" id="pickup" placeholder="From:" />
            </div>
            <div className="form-group">
              <label htmlFor="dropoff">Drop Off Address</label>
              <input type="text" id="dropoff" placeholder="To:" />
            </div>
            <div className="form-group">
              <label htmlFor="days">Days</label>
              <input type="text" id="days" placeholder="dd/mm/yyyy" />
            </div>
            <button className="btn">Book Now</button>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Home
