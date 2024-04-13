import React, { useContext, useEffect } from "react";
import { BlockContext } from "../../context/block.context";
import BsquareShape from "./bSquare/BsquareShape";
import BcircleShape from "./bCircle/BcircleShape";
import { useParams } from "react-router-dom";

const DisplayBlocks = () => {
  const { bSquares, bCircles, setBShapeAdded, bShapeAdded, fetchBlocks } =
    useContext(BlockContext);
  const param = useParams();

  useEffect(() => {
    if (bShapeAdded) {
      setBShapeAdded(false);
    }

    fetchBlocks(param.layoutIdParam);
  }, [param.layoutIdParam, bShapeAdded]);

  return (
    <div className="display-blocks-container">
      {bCircles &&
        bCircles.map((bCircle) => (
          <BcircleShape bCircle={bCircle} key={bCircle._id}></BcircleShape>
        ))}

      {bSquares &&
        bSquares.map((bSquare) => (
          <BsquareShape bSquare={bSquare} key={bSquare._id}></BsquareShape>
        ))}
    </div>
  );
};

export default DisplayBlocks;
