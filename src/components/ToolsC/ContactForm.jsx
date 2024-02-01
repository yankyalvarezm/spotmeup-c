import React from "react";
import GooglePlaces from "./GooglePlaces";

const ContactForm = () => {
  return (
    <div className="contactform-container">
      <div className="icons-tabs-container-contactform " id="icons-tabs-container-contactform">
        <div className="contactform-icon-left">
          <div className="icon-minimize"></div>
          <div className="icon-maximize"></div>
          <div className="icon-close"></div>
        </div>

        <h1 className="contactus-text">Contact Us</h1>
      </div>

      <div className="contactform-body" id="contactform-body">
        <input
          type="text"
          placeholder="Full Name"
          className="contactform-input"
          autoComplete="given-name"
        />

        <input
          type="text"
          placeholder="e-mail"
          className="contactform-input"
          autoComplete="email"
        />

        {/* <GooglePlaces /> */}

        <textarea
          type="textarea"
          placeholder="message"
          className="contactform-input contactform-textarea"
          //   value=""
        />

        <button className="signup-btn">Send Message</button>
      </div>
    </div>
  );
};

export default ContactForm;
