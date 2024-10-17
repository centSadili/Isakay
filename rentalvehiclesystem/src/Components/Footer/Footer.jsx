import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
<div className="footer-container">
    <div className="footer-column">
      <h3>Use cases</h3>
      <ul>
        <li><a href="#">UI Design</a></li>
        <li><a href="#">UX Design</a></li>
        <li><a href="#">Wireframing</a></li>
        <li><a href="#">Diagramming</a></li>
      </ul>
    </div>
    <div className="footer-column">
      <h3>Explore</h3>
      <ul>
        <li><a href="#">Design</a></li>
        <li><a href="#">Prototyping</a></li>
        <li><a href="#">Collaboration features</a></li>
      </ul>
    </div>
    <div className="footer-column">
      <h3>Resources</h3>
      <ul>
        <li><a href="#">Best Practices</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">Developer Resources</a></li>
      </ul>
    </div>
    <div className="footer-column footer-social">
      <a href="#"><i className="fab fa-facebook"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-linkedin"></i></a>
    </div>
  </div>
    </div>
  

  )
}

export default Footer
