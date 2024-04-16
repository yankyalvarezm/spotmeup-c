import React, { useContext, useEffect } from "react";
import { BlockContext } from "../../context/block.context";
import BsquareShape from "./bSquare/BsquareShape";
import BcircleShape from "./bCircle/BcircleShape";
import { useParams } from "react-router-dom";
import AddTables from "../Tables/AddTables";

const DisplayBlocks = ({ children }) => {
  const {
    bSquares,
    bCircles,
    setBShapeAdded,
    bShapeAdded,
    fetchBlocks,
    currentBlock,
  } = useContext(BlockContext);
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
          <BcircleShape bCircle={bCircle} key={bCircle._id}>
            <div
              className={
                currentBlock?._id === bCircle._id ? "table-grid-circle" : ""
              }
              style={{
                gridTemplateColumns: `repeat(${currentBlock?.maxCol}, 1fr)`,
                gridTemplateRows: `repeat(${currentBlock?.maxRow}, 1fr)`,
              }}
            >
              <AddTables block={bCircle} />
              {children}
            </div>
          </BcircleShape>
        ))}

      {bSquares &&
        bSquares.map((bSquare) => (
          <BsquareShape bSquare={bSquare} key={bSquare._id}>
            <div
              className={currentBlock?._id === bSquare._id ? "table-grid" : ""}
              style={{
                gridTemplateColumns: `repeat(${currentBlock?.maxCol}, 1fr)`,
                gridTemplateRows: `repeat(${currentBlock?.maxRow}, 1fr)`,
              }}
            >
              <AddTables block={bSquare} />
              {children}
            </div>
          </BsquareShape>
        ))}
    </div>
  );
};

export default DisplayBlocks;
