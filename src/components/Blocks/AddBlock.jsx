import React from "react";

const AddBlock = () => {
  return (
    <div className="add-block-container">
      <h1 className="add-block-title">Add Blocks</h1>


      <div className="add-block-shapes">
        <div className="add-block-circle"></div>
        <div className="add-block-square">
          <div className="add-block-small-circle">1</div>
          <div className="add-block-small-circle">2</div>
          <div className="add-block-small-circle">3</div>
          <div className="add-block-small-circle">4</div>
        </div>
      </div>
    </div>
  );
};

export default AddBlock;
