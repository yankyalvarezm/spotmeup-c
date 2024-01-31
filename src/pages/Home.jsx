import React from "react";
import SpotMeUpText from "../components/ToolsC/SpotMeUpText";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="homepage-container">
      <SpotMeUpText />
      {/* <h1 className="pages-test"> Home Page</h1> */}
      <h1 className="pages-test">
        {" "}
        <Link to="/about">About Page</Link>{" "}
      </h1>{" "}
      /<h1 className="pages-test"> Edit Profile</h1>
      <SpotMeUpIcon />
    </div>
  );
};

export default Home;
