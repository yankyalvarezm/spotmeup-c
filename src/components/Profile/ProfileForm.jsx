import React from "react";
import SpotMeUpIcon from "../ToolsC/SpotMeUpIcon";

const ProfileForm = () => {
  return (
    <div className="profile-general-container" id="profile-general-container">
      <div className="icons-tabs-container-photoslider ">
        <div className="icon-minimize"></div>
        <div className="icon-maximize"></div>
        <div className="icon-close"></div>
      </div>
      <div className="profileform-body" id="profileform-body">
        <div className="input-label-profile">
          <label hmtlFor="email">E-mail</label>
          <input type="text" name="email" />
        </div>

        <div className="input-label-profile-flex">
          <div className="input-label-profile">
            <label hmtlFor="name">Name</label>
            <input type="text" name="name" />
          </div>

          <div className="input-label-profile">
            <label hmtlFor="lastname">Last Name</label>
            <input type="text" name="lastname" />
          </div>
        </div>

        <div className="input-label-profile">
          <label hmtlFor="telephone">Telephone</label>
          <input type="text" name="telephone" />
        </div>

        <div className="input-label-profile">
          <label hmtlFor="address">Address</label>
          <input type="text" name="address" />
        </div>

        <div className="input-label-profile">
          <label hmtlFor="nationalId">nationalId</label>
          <input type="text" name="nationalId" />
        </div>

      </div>
      <div className="spotmeupicon-profile-form" id="spotmeupicon-profile-form">
        <SpotMeUpIcon />
      </div>
    </div>
  );
};

export default ProfileForm;
