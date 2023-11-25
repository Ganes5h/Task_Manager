import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-parent">
      <div className="footer-child">
        <h3>About me</h3>

        <p>
          Feel free to explore the different features of this application and
          don't hesitate to reach out if you have any questions or feedback.
        </p>
      </div>
      <div className="footer-child">
        <h3>Contact</h3>
        <ul>
          <li>Email: info@example.com</li>
          <li>Phone: (123) 456-7890</li>
          <li>Address: 123 Main St, Cityville, Country</li>
        </ul>
      </div>
      <div className=" icons">
        <span>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-facebook"></i>
        </span>
      </div>
      <div className="copyright">
        Copyright ©2023. All rights reserved. | This website is made by Ganesh
        K.
      </div>
    </div>
  );
}

export default Footer;
