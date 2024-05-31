import React, { Children, useContext, useEffect } from "react";
import { BlockContext } from "../../context/block.context";
import BsquareShape from "./bSquare/BsquareShape";
import BcircleShape from "./bCircle/BcircleShape";
import { useParams } from "react-router-dom";
import AddTables from "../Tables/AddTables";
import { TableContext } from "../../context/table.context";

const DisplayBlocks = ({ children }) => {
  const {
    bSquares,
    bCircles,
    setBShapeAdded,
    bShapeAdded,
    fetchBlocks,
    currentBlock,
    getThisBlock,
  } = useContext(BlockContext);

  const { tSquares, tCircles } = useContext(TableContext);

  const param = useParams();

  useEffect(() => {
    if (bShapeAdded) {
      setBShapeAdded(false);
    }

    if (param.layoutIdParam) {
      fetchBlocks(param.layoutIdParam);
    }
  }, [param.layoutIdParam, bShapeAdded]);

  const separateChildren = (blockId) => {
    // console.log("CHILDREN",children);
    return Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // console.log("CHILDREN",React.cloneElement(child, { blockId }));
        return React.cloneElement(child, { key: blockId, blockId });
      }
      return child;
    });
  };

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
            </div>
            {separateChildren(bCircle._id)}
            {/* {children} */}
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
            </div>
            {separateChildren(bSquare._id)}
          </BsquareShape>
        ))}
    </div>
  );
};

export default DisplayBlocks;
