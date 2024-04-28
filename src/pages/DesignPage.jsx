import React from "react";
import EditModal from "../components/EditModal";
import NavBar from "../components/ToolsC/NavBar";
import Hierarchy from "../components/ToolsC/Hierarchy";

const DesignPage = () => {
  return (
    <div className="design-page-container">
      {/* <NavBar /> */}
      <Hierarchy  />

      <div>
        <EditModal />
      </div>
    </div>
  );
};

export default DesignPage;
