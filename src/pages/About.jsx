import React from "react";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";
import PhotoSlider from "../components/ToolsC/PhotoSlider";
import VideoAbout from "../components/ToolsC/VideoAbout";
import { useState } from "react";
import Info from "../components/ToolsC/Info";
import GoogleMap from "../components/ToolsC/GoogleMap";
import ContactForm from "../components/ToolsC/ContactForm";

const About = () => {
  const [moveToFront, setMoveToFront] = useState(null);

  const handleMoveToFront = (component) => {
    setMoveToFront(component);
  };

  return (
    <>
      <div className="about-container">
        <div>
          <h1 className="title">About</h1>
          <h1 className="title">Us</h1>
        </div>
        <SpotMeUpIcon />
      </div>

      <div className="about-photoslider">
        <PhotoSlider
          active={moveToFront === "PhotoSlider"}
          onClick={() => handleMoveToFront("PhotoSlider")}
        />

        <div className="about-video" id="about-video">
          <VideoAbout
            active={moveToFront === "VideoAbout"}
            onClick={() => handleMoveToFront("VideoAbout")}
          />
        </div>
      </div>

      <div className="about-info" id="about-info">
        <Info />
      </div>

      <div className="about-contactus-container">
        <div className="about-contactus" id="about-contactus">
        <h1 className="designed-test" id="designed-test">HEADQUARTERS</h1>
          <GoogleMap />
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default About;
