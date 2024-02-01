import React, { useEffect } from "react";
import ProfileForm from "../components/Profile/ProfileForm";
import SpotMeUpText from "../components/ToolsC/SpotMeUpText";
import MyProfileTab from "../components/Profile/MyProfileTab";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";

const Profile = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#E1DDD4";

    return () => {
      document.body.style.backgroundColor = "#3B7032";
    };
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profileTabicon" id="profileTabicon">
          <SpotMeUpIcon />
        </div>
        <MyProfileTab />
        <ProfileForm />
      </div>
    </>
  );
};

export default Profile;
