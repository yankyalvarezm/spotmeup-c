import React, { useContext, useState } from "react";
import { BlockContext } from "../../context/block.context";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../context/layout.context";

const AddBlock = () => {
  const { addBlockCircle, addBlockSquare } = useContext(BlockContext);
  const { layoutBody } = useContext(LayoutContext);
  const param = useParams();

  // console.log("layoutBody from blocks:", layoutBody);

  const [blockBody, setBlockBody] = useState({
    blockType: "",
    status: "",
    capacity: 0,
    // bprice: 0,
    maxSection: 0,
    width: 100,
    height: 100,
    borderSize: 1,
    borderLeftSize: 0,
    borderLeftColor: "",
    borderRightSize: 0,
    borderRightColor: "",
    borderBottomSize: 0,
    borderBottomColor: "",
    borderTopSize: 0,
    borderTopColor: "",
    borderColor: "black",
    backgroundColor: "white",
    color: "white",
    justifyContent: "",
    alignItems: "",
    x: layoutBody?.width / 2 - 50,
    y: layoutBody?.height / 2 - 50,
    fontSize: 15,
    isMatched: false,
  });

  return (
    <div className="add-block-container">
      <h1 className="add-block-title">Add Blocks</h1>

      <div className="add-block-shapes">
        <div
          className="add-block-circle"
          onClick={() => addBlockCircle(param.layoutIdParam, blockBody)}
        ></div>
        <div
          className="add-block-square"
          onClick={() => addBlockSquare(param.layoutIdParam, blockBody)}
        >
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
