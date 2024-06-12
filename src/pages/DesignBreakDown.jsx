import React, { useState, useContext, useEffect } from "react";
import BDTickets from "../components/BreakDown/BDTickets";
import BDNavBar from "../components/BreakDown/BDNavBar";
import BDDashboard from "../components/BreakDown/BDDashboard";
import { BreakDownContext } from "../context/breakdown.context";
import { getOneLayout } from "../services/layout.service";
import { BlockContext } from "../context/block.context";
import { useParams } from "react-router-dom";

const DesignBreakDown = () => {
  const { selectedMenu } = useContext(BreakDownContext);
  const { setLayoutObject } = useContext(BlockContext);

  const param = useParams();

  const getTheLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);
    console.log("------ Dashboard -------");
    console.log("getTheLayout:", response);

    if (response.success) {
      setLayoutObject(response.layout);
    }
  };

  useEffect(() => {
    getTheLayout();
  }, []);

  return (
    <div className="design-breakdown-page">
      <BDNavBar />
      {selectedMenu === "tickets" && <BDTickets />}

      {selectedMenu === "dashboard" && <BDDashboard />}
    </div>
  );
};

export default DesignBreakDown;
