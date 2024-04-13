import React, { createContext, useState, useRef } from "react";
import { createBlock, getAllBlocks } from "../services/block.service";
import { editBlock } from "../services/block.service";

const BlockContext = createContext();

function BlockProvider({ children }) {
  const bShapeForm = useRef();
  const [bCircles, setBCircles] = useState([]);
  const [bSquares, setBSquares] = useState([]);
  const [bShapeAdded, setBShapeAdded] = useState(false);
  const [showBShapeForm, setShowBShapeForm] = useState(false);
  const [blockId, setBlockId] = useState(null);

  const fetchBlocks = async (layoutId) => {
    console.log("Fetch Blocks");
    try {
      const response = await getAllBlocks(layoutId);

      if (response.success) {
        const blockCircleFilter = response.blocks.filter(
          (block) => block.blockType.toLowerCase() === "circle"
        );
        const blockSquareFilter = response.blocks.filter(
          (block) => block.blockType.toLowerCase() === "square"
        );
        setBCircles(blockCircleFilter);
        setBSquares(blockSquareFilter);
        console.log("All Blocks", response.blocks);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const addBlockCircle = async (layoutId, body) => {
    body.blockType = "Circle";
    try {
      const response = await createBlock(layoutId, body);
      if (response.success) {
        setBCircles((prev) => [...prev, response.block]);
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
        setBSquares((prev) => [...prev, response.block]);
        setBShapeAdded(true);
        console.log("Block Square Added:", response.block);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBShapeForm = () => {
    setShowBShapeForm((prev) => !prev);
  };

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const updateBShape = debounce((shapeId, body) => {
    editBlock(shapeId, body);
    // console.log("Tools debounce working");
  }, 500);

  return (
    <BlockContext.Provider
      value={{
        bCircles,
        setBCircles,
        bSquares,
        setBSquares,
        bShapeAdded,
        setBShapeAdded,
        addBlockCircle,
        addBlockSquare,
        fetchBlocks,
        updateBShape,
        showBShapeForm,
        setShowBShapeForm,
        blockId,
        setBlockId,
        bShapeForm,
        toggleBShapeForm,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export { BlockProvider, BlockContext };
