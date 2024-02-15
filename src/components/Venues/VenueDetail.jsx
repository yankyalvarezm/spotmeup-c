import React, { useContext } from "react";
import { VenuesContext } from "../../context/venues.context";
import { useNavigate } from "react-router-dom";

const VenueDetail = () => {
  const { venueDetail, venueId } = useContext(VenuesContext);
  const navigate = useNavigate();

  const changePage = () => {
    navigate(`/admin/venuedetails/${venueId}`);
  };
  return (
    <div
      className="profile-general-container venue-detail"
      id="profile-general-container"
      onClick={changePage}
    >
      <div className="icons-tabs-container-photoslider venue-detail-container">
        <div className="icon-close icon-close-detail"></div>
      </div>

      <div
        className="profileform-body venue-details-body"
        id="profileform-body"
      >
        <div className="venue-detail-body-container">
          {/* <div className="venue-detail-img"></div> */}
          <div className="venue-detail-info">
            <h1 className="venue-detail-name">{venueDetail?.name}</h1>
            <h1 className="venue-detail-city">
              {venueDetail?.address?.city}, {venueDetail?.address?.state}
            </h1>
            <h1 className="venue-detail-city">
              {venueDetail?.address?.street}
            </h1>
          </div>
        </div>
        <h1 className="goto-profile">Click me to go to venue</h1>
        <h1 className="venue-details-description">
          DESCRIPTION. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Qui quod labore velit officiis, deleniti.
        </h1>
      </div>
      <div
        className="spotmeupicon-profile-form"
        id="spotmeupicon-profile-form"
      ></div>
    </div>
  );
};

export default VenueDetail;
