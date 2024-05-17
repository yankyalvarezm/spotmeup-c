import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutContext } from "../context/layout.context";
import { ShapeContext } from "../context/shape.context";
import LayoutContent from "./Layouts/LayoutContent";
import LayoutTools from "./Layouts/LayoutTools";
import DisplayShapes from "./Shapes/DisplayShapes";
import ShapesTools from "./Shapes/ShapesTools";
import AddShape from "./Shapes/AddShape";
import AddBlock from "./Blocks/AddBlock";
import DisplayBlocks from "./Blocks/DisplayBlocks";
import BlockTools from "./Blocks/BlockTools";
import { BlockContext } from "../context/block.context";
import BlockGridSetUp from "./Blocks/BlockGridSetUp";
import DisplayTables from "./Tables/DisplayTables";
import { TableContext } from "../context/table.context";
import TableTools from "./Tables/TableTools";
import { editLayout } from "../services/layout.service";
import { useGesture } from "react-use-gesture";

const EditModal = () => {
  const navigate = useNavigate();
  const param = useParams();
  const {
    layoutDetails,
    setLayoutId,
    layoutId,
    floorPlan,
    toggleFloorPlan,
    layoutBody,
    setLayoutDetails,
  } = useContext(LayoutContext);
  // console.log("🚀 ~ EditModal ~ layoutDetails:", layoutDetails);

  const { showBShapeForm } = useContext(BlockContext);
  const { showShapeForm } = useContext(ShapeContext);
  const { showTShapeForm, editingTables, setEditingTables } =
    useContext(TableContext);

  const goBack = () => {
    if (!editingTables) {
      navigate(`/admin/venuedetails/${layoutDetails.venue}`);
    }
  };

  const moveToBreakDown = () => {
    navigate(`/admin/designpage/${param.layoutIdParam}/breakdown`);
  };
  const [zoomLevel, setZoomLevel] = useState(null);

  const [isCursorOver, setIsCursorOver] = useState(false);

  const isCursorOverRef = useRef(isCursorOver);
  // console.log("🚀 ~ EditModal ~ isCursorOverRef:", isCursorOverRef.current);

  // console.log("layoutDetails:", layoutDetails);

  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
  }, [layoutId]);

  useEffect(() => {
    if (zoomLevel == null && layoutDetails?.displayScale) {
      setZoomLevel(layoutDetails?.displayScale);
    }
  }, [layoutDetails, zoomLevel]);

  const handleZoomIncrease = async (level) => {
    try {
      const newZoomLevel = +(zoomLevel + level).toFixed(3);

      setZoomLevel(newZoomLevel);

      const response = await editLayout(param.layoutIdParam, {
        displayScale: newZoomLevel,
      });
      setLayoutDetails((prev) => {
        return { ...prev, displayScale: newZoomLevel };
      });
      // console.log("🚀 ~ handleZoomIncrease ~ response:", response);
    } catch (error) {
      console.log("ZoomIncrease - Error:", error.response);
    }
  };

  const handleZoomDecrease = async (level) => {
    try {
      const newZoomLevel = +(zoomLevel - level).toFixed(3);

      setZoomLevel(newZoomLevel);
      const response = await editLayout(param.layoutIdParam, {
        displayScale: newZoomLevel,
      });
      setLayoutDetails((prev) => {
        return { ...prev, displayScale: newZoomLevel };
      });
    } catch (error) {
      console.log("ZoomIncrease - Error:", error.response);
    }
  };

  const handlePinch = async (e) => {
    // console.log(e.delta[0]);
    // console.log("layoutDetalis.displayScale:", layoutDetails?.displayScale);
    const delta = e.delta[0];

    // try {
    //   if (delta > 0) {
    //     // handleZoomIncrease(0.001);
    //     const newZoomLevel = +(zoomLevel - 0.001).toFixed(2);
    //     setZoomLevel(newZoomLevel);
    //     const response = await editLayout(param.layoutIdParam, {
    //       displayScale: newZoomLevel,
    //     });
    //     setLayoutDetails((prev) => {
    //       return { ...prev, displayScale: newZoomLevel };
    //     });
    //   }

    //   if (delta < 0) {
    //     console.log("Decreasing");
    //     // handleZoomDecrease(0.001);
    //     const newZoomLevel = +(zoomLevel + 0.001).toFixed(2);
    //     setZoomLevel(newZoomLevel);
    //     const response = await editLayout(param.layoutIdParam, {
    //       displayScale: newZoomLevel,
    //     });
    //     setLayoutDetails((prev) => {
    //       return { ...prev, displayScale: newZoomLevel };
    //     });
    //   }
    // } catch (error) {
    //   console.log("ZoomIncrease - Error:", error);
    // }

    if (delta > 0) {
      const number = 0.01 / 2;

      handleZoomIncrease(0.008);
    }

    if (delta < 0) {
      handleZoomDecrease(0.008);
    }

    console.log("Increasing");
  };

  const pinch = useGesture(
    {
      onPinch: (e) => {
        handlePinch(e);
        console.log("pinching");
      },
    },
    {
      domTarget: document.getElementById("layout-styled-div"),
      eventOptions: { passive: false },
    }
  );

  useEffect(() => {
    if (pinch) pinch();
  }, [pinch]);
  // console.log("🚀 ~ EditModal ~ isCursorOver:", isCursorOver);

  // useEffect(() => {
  //   const layoutStyledDiv = document.getElementById("layout-styled-div");
  //   const squareShapes = document.querySelectorAll(".square-shape");

  //   if (layoutStyledDiv) {
  //     const handleMouseEnterLayout = () => {
  //       setIsCursorOver(true);
  //       isCursorOverRef.current = true;
  //     };
  //     const handleMouseLeaveLayout = () => {
  //       setIsCursorOver(false);
  //       isCursorOverRef.current = false;
  //     };
  //     const handleMouseEnterSquare = () => {
  //       setIsCursorOver(false);
  //       isCursorOverRef.current = false;
  //     };
  //     const handleMouseLeaveSquare = () => {
  //       setIsCursorOver(true);
  //       isCursorOverRef.current = true;
  //     };

  //     layoutStyledDiv.addEventListener("mouseenter", handleMouseEnterLayout);
  //     layoutStyledDiv.addEventListener("mouseleave", handleMouseLeaveLayout);

  //     squareShapes.forEach((squareShape) => {
  //       squareShape.addEventListener("mouseenter", handleMouseEnterSquare);
  //       squareShape.addEventListener("mouseleave", handleMouseLeaveSquare);
  //     });

  //     const handleTouch = (e) => {
  //       console.log("🚀 ~ handleTouch ~ e.touches.length:", e.touches.length);
  //     };

  //     const layoutStyledDiv3 = document.getElementById("layout-styled-div");
  //     if (layoutStyledDiv3) {
  //       layoutStyledDiv3.addEventListener("touchstart", handleTouch);
  //     }

  //     const handleWheel = async (e) => {
  //       const isMovingUpAndDown =
  //       (e.deltaY > 0 && e.deltaX < 0) || (e.deltaY < 0 && e.deltaX > 0);
  //       console.log(e);
  //       if (isCursorOverRef.current) {
  //         e.preventDefault();
  //         console.log("e:", e);

  //         let newZoomLevel = zoomLevel + e.deltaY * -0.01;
  //         newZoomLevel = Math.min(Math.max(0.125, newZoomLevel), 4);

  //         setZoomLevel(newZoomLevel);
  //         const shapesContainer = document.querySelector(
  //           ".display-shapes-container"
  //         );
  //         shapesContainer.style.transform = `scale(${newZoomLevel})`;

  //         try {
  //           const response = await editLayout(param.layoutIdParam, {
  //             displayScale: newZoomLevel,
  //           });
  //           setLayoutDetails((prev) => ({
  //             ...prev,
  //             displayScale: newZoomLevel,
  //           }));
  //         } catch (error) {
  //           console.log("Zoom Update - Error:", error.response);
  //         }
  //       }
  //     };

  //     layoutStyledDiv.addEventListener("wheel", handleWheel);

  //     return () => {
  //       layoutStyledDiv.removeEventListener(
  //         "mouseenter",
  //         handleMouseEnterLayout
  //       );
  //       layoutStyledDiv.removeEventListener(
  //         "mouseleave",
  //         handleMouseLeaveLayout
  //       );

  //       squareShapes.forEach((squareShape) => {
  //         squareShape.removeEventListener("mouseenter", handleMouseEnterSquare);
  //         squareShape.removeEventListener("mouseleave", handleMouseLeaveSquare);
  //       });

  //       layoutStyledDiv.removeEventListener("wheel", handleWheel);
  //     };
  //   }
  // }, [zoomLevel, isCursorOver]);

  return (
    <div className="design-big-container">
      <div className="edit-modal-btns">
        <button
          onClick={goBack}
          className={!editingTables ? "goback-btn-design" : "load-goback"}
        >
          {!editingTables ? "Go Back" : "Saving..."}
        </button>
        <button className="dashboard-btn" onClick={moveToBreakDown}>
          Dasboard
        </button>
      </div>
      <div className="tools-title">
        <div className="design-container">
          <div className="design-header-container">
            <h1 id="design-layout-title">
              {layoutDetails && layoutDetails.name}
            </h1>
            <div className="zoom-controls">
              <h1 className="scale-display">
                Scale: {Math.ceil(layoutDetails?.displayScale * 100)}%
              </h1>
              <button onClick={() => handleZoomIncrease(0.05)}>+</button>
              <button>Zoom</button>
              <button onClick={() => handleZoomDecrease(0.05)}>-</button>
            </div>
          </div>

          <div className="design-main-content">
            <LayoutContent>
              <DisplayShapes />

              <DisplayBlocks>
                <DisplayTables />
              </DisplayBlocks>
            </LayoutContent>
          </div>
        </div>
        <ShapesTools />
        <BlockTools>
          <BlockGridSetUp />
        </BlockTools>
        <TableTools />
        {!showShapeForm && !showBShapeForm && !showTShapeForm && (
          <div
            className={
              floorPlan || layoutBody.layoutType
                ? "active-tools"
                : "tools-container"
            }
          >
            <LayoutTools>
              <hr className="hr-layout-tools" />
              <AddShape />
              <AddBlock />
            </LayoutTools>
            <button
              className={
                floorPlan || layoutBody?.layoutType
                  ? "toggle-floorplan"
                  : "hide"
              }
              onClick={toggleFloorPlan}
            >
              Floor Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditModal;
