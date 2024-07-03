import React from "react";
import SpotMeUpIcon from "../ToolsC/SpotMeUpIcon";

const Footer = () => {
  return (
    <div className="footer-big-container">
      <div className="footer-container">
        <div className="footer-first-grid">
          <h1 className="normalize-font margin-bottom">About US</h1>
          <div className="normalize-font">
            <h1 className="margin-bottom">Contact Us</h1>
            <h1 className="margin-bottom">Phone</h1>
            <h1 className="margin-bottom">Email</h1>
          </div>
          <SpotMeUpIcon />
        </div>

        <div>
          <h1 className="normalize-font-title">Information</h1>
          <h1 className="normalize-font margin-bottom">About Us</h1>
          <h1 className="normalize-font margin-bottom">More Search</h1>
          <h1 className="normalize-font margin-bottom">Blog</h1>
          <h1 className="normalize-font margin-bottom">Testimonials</h1>
          <h1 className="normalize-font margin-bottom">Events</h1>
        </div>

        <div>
          <h1 className="normalize-font-title">Helpful Links</h1>
          <h1 className="normalize-font margin-bottom">Services</h1>
          <h1 className="normalize-font margin-bottom">Supports</h1>
          <h1 className="normalize-font margin-bottom">Terms & Conditions</h1>
          <h1 className="normalize-font margin-bottom">Privacy Policy</h1>
        </div>

        <div className="newsletter-container">
          <h1 className="normalize-font-title">Newsletter</h1>
          <input type="email" placeholder="your-email@email.com" />
          <button className="newsletter-btn">Suscribe</button>
        </div>
      </div>

      <hr className="footer-hr" />

      <div className="footer-social-media">
        <div className="normalize-font">Instagram</div>
        <div className="normalize-font">Facebook</div>
        <div className="normalize-font">X</div>
        <div className="normalize-font">Linkedin</div>
      </div>
    </div>
  );
};

export default Footer;
