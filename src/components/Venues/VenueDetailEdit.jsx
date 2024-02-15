import React, { useContext, useEffect, useState } from "react";
import { VenuesContext } from "../../context/venues.context";
import EditVenueForm from "./VenueFormEdit";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteOneVenue } from "../../services/venue.service";

const VenueDetailEdit = () => {
  const { venueDetail, setVenueId } = useContext(VenuesContext);
  const [showPromt, setShowPrompt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageNotSuccess, setMessageNotSuccess] = useState(null);

//   console.log("params:", params);

  const togglePrompt = () => {
    setShowPrompt((prev) => !prev);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const goToMyEvents = () => {
    navigate("/myevents");
  };

  useEffect(() => {
    if (params) {
      setVenueId(params.venueIdParam);
    }
  }, [params.venueIdParam, setVenueId]);

  const deleteVenues = async (id) => {
    try {
      const response = await deleteOneVenue(id);
      console.log("Line 38 - Response", response);
      setMessageSuccess(response.message);
      setTimeout(() => {
        console.log("cleared success message");
        navigate("/myevents");
        setMessageSuccess(null);
      }, 3000);
    } catch (error) {
      console.log("error:", error);
      setMessageNotSuccess(error.response.data.message);
      setTimeout(() => {
        console.log("cleared Not Success message");
        setMessageNotSuccess(null);
      }, 3000);
    }
  };

  return (
    <div className="photoslider-container photoslider-container-venue">
      <div className="icons-tabs-container-photoslider admin-tabs-icons">
        <div
          className="icon-close admin-icon-close"
          onClick={goToMyEvents}
        ></div>
      </div>
      <div className="photoslider-body admin-body">
        {!showPromt && !showForm && (
          <>
            <div className="admin-venue-img"></div>
            <div className="admin-fields-container">
              <h1 id="admin-detail-name">{venueDetail?.name}</h1>
              <h1 id="admin-detail-city">
                {venueDetail?.address?.city}, {venueDetail?.address?.state}
              </h1>
              <div className="admin-options">
                <h1>Max Capacity:</h1>
                <h1>{venueDetail?.maxCapacity}</h1>
              </div>

              <div className="admin-options">
                <h1>Contact:</h1>
                <h1>{venueDetail?.contact?.email}</h1>
              </div>

              <div className="admin-options">
                <h1>Owner:</h1>
                <h1>{venueDetail?.contact?.owner}</h1>
              </div>

              <div className="admin-options">
                <h1>Telephone:</h1>
                <h1>{venueDetail?.contact?.telephone}</h1>
              </div>

              <div className="admin-options">
                <button onClick={toggleForm}>Edit Venue</button>
                <button className="delete-venue" onClick={togglePrompt}>
                  Delete Venue
                </button>
              </div>
            </div>
          </>
        )}

        {showPromt && (
          <div className="admin-options-prompt">
            {messageSuccess && (
              <h1 id="success-message-venue">{messageSuccess}</h1>
            )}
            {messageNotSuccess && (
              <h1 id="not-success-message-venue">{messageNotSuccess}</h1>
            )}

            <h1>Are you sure you want to delete {venueDetail?.name}?</h1>
            <div className="admin-options-two">
              <button onClick={() => deleteVenues(params.venueIdParam)}>
                Yes
              </button>
              <button className="delete-venue" onClick={togglePrompt}>
                No
              </button>
            </div>
          </div>
        )}

        {!showPromt && showForm && (
          <div>
            <EditVenueForm toggleForm={toggleForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetailEdit;
