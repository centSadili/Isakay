import React from 'react'
import Header from '../Header/Header'
import './About.css';

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
            <img src="https://i.pinimg.com/736x/9c/fb/8f/9cfb8f39d2db9e4a45b972b93e59bd17.jpg" alt="Gallery Image 1" />
            <img src="https://i.pinimg.com/564x/11/26/77/112677978c3d6b59a418677161c9623d.jpg" alt="Gallery Image 2" />
            <img src="https://i.pinimg.com/564x/2c/fa/c3/2cfac3409ca7ca0762ad7a3b8833eb28.jpg" alt="Gallery Image 3" />
            <img src="https://i.pinimg.com/736x/98/ea/32/98ea32fb48a95d43ca5481490544a9b0.jpg" alt="Gallery Image 4" />
            <img src="https://i.pinimg.com/564x/10/48/2e/10482e8df1e76560be73a974cb463c3d.jpg" alt="Gallery Image 5" />
            <img src="https://i.pinimg.com/564x/a2/bc/e2/a2bce2804ecacbc7ce7892352ebd1290.jpg" alt="Gallery Image 6" />
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

        


      


    </div>
  )
}

export default About
