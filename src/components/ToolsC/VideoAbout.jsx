import React from "react";

const VideoAbout = ({ active, onClick }) => {
  return (
    <div
      className={`videoabout-container ${active ? "topzindex" : ""}`}
      onClick={onClick}
      id="videoabout-container"
    >
      <div className="icons-tabs-container-videoabout" id="icons-tabs-container-videoabout">
        <div className="icon-minimize"></div>
        <div className="icon-maximize"></div>
        <div className="icon-close"></div>
      </div>
      <div className="videoabout-body" id="videoabout-body">
        <h1 className="black bigger-font">VIDEO</h1>
      </div>
    </div>
  );
};

export default VideoAbout;
