import React from "react";
import BDTickets from "../components/BreakDown/BDTickets";
import BDNavBar from "../components/BreakDown/BDNavBar";

const DesignBreakDown = () => {
  return (
    <div className="design-breakdown-page">
      <BDNavBar />

      <BDTickets />
    </div>
  );
};

export default DesignBreakDown;
