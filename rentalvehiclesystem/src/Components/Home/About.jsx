import React from 'react'
import Header from '../Header/Header'
import './About.css';
import Footer from '../Footer/Footer';

const About = () => {
  return (
    <div className="about-main-container">
      <Header/>
      <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <section id="contact-things-about-us" className="contact-section">
          <img className="contact-profile-img" src="carlogotrial.png" alt="Your Name - Photographer" />
          <h2 className="contact-title2">Isakay</h2>
          <h2 className="get"style={{ marginTop: '20px' }}>GET TO KNOW US</h2>
          <p className="contact-text">
          Welcome to Isakay Rental, your reliable partner for convenient and affordable transportation solutions. At Isakay Rental, we are passionate about making local travel easier, more accessible, and enjoyable. Whether you're exploring the vibrant cityscape, visiting family, or embarking on an exciting adventure, our fleet is designed to meet your every need.
  
          <br /><br /> 
  
        Founded on the principles of customer service and quality, Isakay Rental was created to bring a seamless rental experience to anyone in need of a reliable ride. We understand that flexibility, transparency, and efficiency are essential, so we’ve built our services with these values at the core.
    </p>
        </section>
        
        <section id="contact-things-about-us" className="contact-section">
        <h2 className="contact-title2">GALLERY</h2>
        
        <div class="gallery">
            <img src="https://images.unsplash.com/photo-1605556816125-d752c226247b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU5fHxzdXBlciUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D" alt="Gallery Image 1" />
            <img src="https://images.unsplash.com/photo-1628188422678-88d25bf27bed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D" alt="Gallery Image 2" />
            <img src="https://images.unsplash.com/photo-1616591938558-fb03d845567b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D" alt="Gallery Image 3" />
            <img src="https://images.unsplash.com/photo-1616591938203-9b5630a01006?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D" alt="Gallery Image 4" />
            <img src="https://images.unsplash.com/photo-1635770310909-f5569b8f4b95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8" alt="Gallery Image 5" />
            <img src="https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-1fndzcd_41017374.jpeg?region=0,0,600,600" alt="Gallery Image 6" />
      </div>
         
      <h3 class="abouts"> Travel with us on another world! – Isakay</h3>

      <h2  className="get" style={{ marginTop: '20px' }} >Mission and Vision</h2>

      <p className="contact-text">
  <strong>Mission</strong><br /><br />
  At Isakay, our mission is to make local travel accessible, convenient, and enjoyable by providing high-quality rental services that fit seamlessly into our customers' lifestyles. We aim to offer reliable, flexible, and affordable transportation options, fostering a travel experience that brings comfort and peace of mind to every journey.
  
  <br /><br />

  <strong>Vision</strong><br /><br />
  Our vision is to be the leading provider of transportation rental services in the region, known for innovation, exceptional customer service, and a commitment to sustainability. We aspire to be a trusted partner in local mobility, setting new standards for quality and convenience in every ride, and building a community where travel is always within reach.
</p>

        </section>

      </div>
      <Footer/>

        


      


    </div>
  )
}

export default About
