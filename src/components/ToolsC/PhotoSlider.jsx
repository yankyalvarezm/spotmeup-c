import React from "react";
import { useState } from "react";

const PhotoSlider = ({ active, onClick }) => {
  const [zindex, setZindex] = useState(false);

  const topzindex = () => {
    setZindex(true);
  };

  return (
    <div
      className={`photoslider-container ${active ? "topzindex" : ""}`}
      onClick={onClick}
    >
      <div className="icons-tabs-container-photoslider ">
        <div className="icon-minimize"></div>
        <div className="icon-maximize"></div>
        <div className="icon-close"></div>
      </div>
      <div className="photoslider-body">
        <h1 className="black bigger-font">PHOTO SLIDER</h1>
      </div>
    </div>
  );
};

export default PhotoSlider;
