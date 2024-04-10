import React, { createContext, useState } from "react";
import { createBlock, getAllBlocks } from "../services/block.service";

const BlockContext = createContext();

function BlockProvider({ children }) {
  const [bCircle, setBCircle] = useState([]);
  const [bSquare, setBSquare] = useState([]);
  const [bShapeAdded, setBShapeAdded] = useState(false);

  const fetchBlocks = async (layoutId) => {
    try {
      const response = await getAllBlocks(layoutId);
      if (response.success) {
        const blockCircleFilter = response.blocks.filter(
          (block) => block.blockType.toLowerCase() === "circle"
        );
        const blockSquareFilter = response.shapes.filter(
          (block) => block.blockType.toLowerCase() === "square"
        );
        setBCircle(blockCircleFilter);
        setBSquare(blockSquareFilter);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBlockCircle = async (layoutId, body) => {
    body.blockType = "Circle";
    try {
      const response = await createBlock(layoutId, body);
      if (response.success) {
        setBCircle((prev) => [...prev, response.block]);
        setBShapeAdded(true);
        console.log("Block Circle Added:", bCircle.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBlockSquare = async (layoutId, body) => {
    body.blockType = "Square";
    try {
      const response = await createBlock(layoutId, body);
      if (response.success) {
        setBSquare((prev) => [...prev, response.block]);
        setBShapeAdded(true);
        console.log("Block Square Added:", bSquare.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BlockContext.Provider
      value={{
        bCircle,
        setBCircle,
        bSquare,
        setBSquare,
        bShapeAdded,
        setBShapeAdded,
        addBlockCircle,
        addBlockSquare,
        fetchBlocks,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export { BlockProvider, BlockContext };
