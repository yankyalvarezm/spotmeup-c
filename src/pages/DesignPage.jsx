import React from "react";
import EditModal from "../components/EditModal";
import NavBar from "../components/ToolsC/NavBar";

const DesignPage = () => {
  return (
    <div className="design-page-container">
      <NavBar />

      <div>
        <EditModal />
      </div>
    </div>
  );
};

export default DesignPage;
