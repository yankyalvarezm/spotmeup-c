import React from "react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "8px 8px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export default Marker;
