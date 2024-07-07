import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EBouncers = () => {
  const navigate = useNavigate();
  const param = useParams();

  return (
    <div className="scanning-link-topage">
      <h1 className="bouncer-title-two">Click below to use scanning tool</h1>
      <button
        className="bouncer-title"
        onClick={() => navigate(`/scannig-tool/${param.eventIdParam}`)}
      >
        Scanning - Tool
      </button>
    </div>
  );
};

export default EBouncers;
