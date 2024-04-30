import React, { createContext, useState, useRef } from "react";
import { createBlock, getAllBlocks } from "../services/block.service";
import { editBlock } from "../services/block.service";

const BlockContext = createContext();

function BlockProvider({ children }) {
  const bShapeForm = useRef();
  const bSquareRef = useRef(null);
  const bCircleRef = useRef(null);
  const [bCircles, setBCircles] = useState([]);
  const [bSquares, setBSquares] = useState([]);
  const [bShapeAdded, setBShapeAdded] = useState(false);
  const [showBShapeForm, setShowBShapeForm] = useState(false);
  const [blockId, setBlockId] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [tShapeAdded, setTShapeAdded] = useState(false);
  const [priceUpdated, setPriceUpdated] = useState(false);

  const fetchBlocks = async (layoutId) => {
    console.log("Fetch Blocks");
    try {
      const response = await getAllBlocks(layoutId);

      // console.log("blockResponse:", response)

      if (response.success) {
        const blockCircleFilter = response.blocks.filter(
          (block) => block.blockType.toLowerCase() === "circle"
        );
        const blockSquareFilter = response.blocks.filter(
          (block) => block.blockType.toLowerCase() === "square"
        );
        setBCircles(blockCircleFilter);
        setBSquares(blockSquareFilter);
        // console.log("All Blocks", response.blocks);
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
        console.log("Block Circle Added:", bCircles.length);
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

  // console.log("blockID Contect", blockId);

  const updateBShape = debounce(async (shapeId, body) => {
    try {
      const response = await editBlock(shapeId, body);
      // console.log("context - response:", response);
      if (response.success) {
        setPriceUpdated(true);
      }
      return response;
    } catch (error) {
      console.log("error:", error);
    }

    // console.log("updateBSHape")
  }, 500);

  // console.log("priceUpdated", priceUpdated);

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
        currentBlock,
        setCurrentBlock,
        bSquareRef,
        bCircleRef,
        priceUpdated,
        setPriceUpdated,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export { BlockProvider, BlockContext };
