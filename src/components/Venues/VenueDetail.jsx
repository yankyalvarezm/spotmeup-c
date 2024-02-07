import React from "react";

const VenueDetail = () => {
  return (
    <div
      className="profile-general-container venue-detail"
      id="profile-general-container"
    >
      <div className="icons-tabs-container-photoslider venue-detail-container">
        <div className="icon-close icon-close-detail"></div>
      </div>

      <div
        className="profileform-body venue-details-body"
        id="profileform-body"
      >
        <div className="venue-detail-body-container">
          <div className="venue-detail-img"></div>
          <div className="venue-detail-info">
            <h1 className="venue-detail-name">Name of the venue</h1>
            <h1 className="venue-detail-city">City - City</h1>

            <h1 className="layout-venue-title">Layout for this venue</h1>
            <div className="venue-details-layout">
                <h1 className="venue-detail-layout">Layout #1</h1>
                <h1 className="venue-detail-layout">Layout #2</h1>
                <h1 className="venue-detail-layout">Layout #3</h1>
            </div>
          </div>
        </div>
        <h1 className="goto-profile">Go To Profile</h1>
        <h1 className="venue-details-description">
          DESCRIPTION. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Qui quod labore velit officiis, deleniti ullam praesentium tempore
          consectetur culpa vitae autem unde minima obcaecati aut iste? Ex
          doloremque hic quo? Sequi harum consectetur assumenda quam ullam
          voluptatum aliquam eius itaque totam dolorum voluptas, voluptatem
          laudantium corporis
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
