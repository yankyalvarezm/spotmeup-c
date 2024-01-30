import React from "react";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";
import PhotoSlider from "../components/ToolsC/PhotoSlider";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div>
          <h1 className="title">About</h1>
          <h1 className="title">Us</h1>
        </div>
        <SpotMeUpIcon />
      </div>

      <PhotoSlider />
    </>
  );
};

export default About;
