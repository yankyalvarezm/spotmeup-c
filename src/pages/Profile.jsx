import React from "react";
import ProfileForm from "../components/Profile/ProfileForm";
import SpotMeUpText from "../components/ToolsC/SpotMeUpText";
import MyProfileTab from "../components/Profile/MyProfileTab";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";

const Profile = () => {
  return (
    <>
      <div >
        <div className="profileTabicon" id="profileTabicon">
          <SpotMeUpIcon />
        </div>

        <div className="profile-container">
          <MyProfileTab />
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
