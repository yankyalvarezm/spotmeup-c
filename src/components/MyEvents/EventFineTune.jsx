import React, { useContext } from "react";
import { MyEventsContext } from "../../context/myEvents.context";

const EventFineTune = () => {
  const { setTicketFormActive, tuneFormActive, setTuneFormActive } =
    useContext(MyEventsContext);

  const handleDone = (e) => {
    e.preventDefault();

    setTuneFormActive(false);
    setTicketFormActive(true);
  };

  return (
    <div className="event-fine-tune">
      <div>
        <h1 className="event-fine-tune-title">
          Select all the option that you would like to add
        </h1>
        <div className="tune-options-container">
          <div className="tune-option">
            <div></div>
            <h1>Entry Fee</h1>
            <div className="check-mark-img"></div>
          </div>
          <div className="tune-option">
            <div></div>
            <h1>Pre-Sale</h1>
            <div className="check-mark-img"></div>
          </div>
          <div className="tune-option">
            <div></div>
            <h1>Early Bird Special</h1>
            <div className="check-mark-img"></div>
          </div>
          <div className="tune-option">
            <div></div>
            <h1>Quanity per person</h1>
            <div className="check-mark-img"></div>
          </div>
          <div className="tune-option">
            <div></div>
            <h1>Add a Drop</h1>
            <div className="check-mark-img"></div>
          </div>
          <div className="tune-option">
            <div></div>
            <h1>Sponsor Presale</h1>
            <div className="check-mark-img"></div>
          </div>
        </div>
      </div>
      <button className="event-fine-button" onClick={handleDone}>
        Done
      </button>
    </div>
  );
};

export default EventFineTune;
