import React, { createContext, useState, useRef } from "react";
import { createBlock, getAllBlocks } from "../services/block.service";
import { editBlock } from "../services/block.service";
import { findBlock } from "../services/block.service";

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
  const [layoutObject, setLayoutObject] = useState({});
  const [hasBlockChanged, setHasBlockChanged] = useState(false);
  const [blockDeleted, setBlockDeleted] = useState(false);

  const fetchBlocks = async (layoutId) => {
    try {
      const response = await getAllBlocks(layoutId);
      // console.log("-------- Design Page ----------")
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
  const getThisBlock = async (blockId) => {
    try {
      const response = await findBlock(blockId);

      // console.log("blockResponse:", response);
      if (response.block.blockType.toLowerCase() === "circle") {
        setBCircles((prev) => {
          return prev.map((block) =>
            block._id === blockId ? response.block : block
          );
        });
      } else if (response.block.blockType.toLowerCase() === "square") {
        setBSquares((prev) => {
          return prev.map((block) =>
            block._id === blockId ? response.block : block
          );
        });
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
      console.log("Edit Block - Context:", response);
      if (response.success) {
        setHasBlockChanged(true);
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
        layoutObject,
        setLayoutObject,
        getThisBlock,
        hasBlockChanged,
        setHasBlockChanged,
        blockDeleted,
        setBlockDeleted,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export { BlockProvider, BlockContext };
