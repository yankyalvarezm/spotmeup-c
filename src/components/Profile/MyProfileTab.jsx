import React from "react";

const MyProfileTab = () => {
  return (
    <div className="myprofiletab-container" id="myprofiletab-container">
      <div className="profile-title-text" id="profile-title-text">
        <h1>My</h1>
        <h1>Profile</h1>
      </div>

      <div className="profiletab-container-image">
        <div className="profilepicture" id="profilepicture"></div>

        <div className="btns-profile-container">
          <button className="signup-btn profile-btn">Change Photo</button>
          <button className="signup-btn profile-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfileTab;
