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
    layoutRef,
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
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const timerId = useRef(null);
  const offSetTimer = useRef(null);

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

  const handleZoomIncrease = async (level, e) => {
    console.log(e);

    try {
      const newZoomLevel = +(zoomLevel + level).toFixed(3);

      setZoomLevel(newZoomLevel);

      if (!e.pinching) {
        const response = await editLayout(param.layoutIdParam, {
          displayScale: newZoomLevel,
        });
      }

      setLayoutDetails((prev) => {
        return { ...prev, displayScale: newZoomLevel };
      });
      // console.log("🚀 ~ handleZoomIncrease ~ response:", response);
    } catch (error) {
      console.log("ZoomIncrease - Error:", error.response);
    }
  };

  const handleZoomDecrease = async (level, e) => {
    try {
      const newZoomLevel = +(zoomLevel - level).toFixed(3);

      setZoomLevel(newZoomLevel);

      if (!e.pinching) {
        const response = await editLayout(param.layoutIdParam, {
          displayScale: newZoomLevel,
        });
      }
      setLayoutDetails((prev) => {
        return { ...prev, displayScale: newZoomLevel };
      });
    } catch (error) {
      console.log("ZoomIncrease - Error:", error.response);
    }
  };

  const handlePinch = async (e) => {
    const delta = e.delta[0];
    const level = 0.03;

    if (e.first && timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    if (delta !== 0) {
      const adjustment = delta > 0 ? level : -level;
      const newZoomLevel = +(zoomLevel + adjustment).toFixed(3);
      setZoomLevel(newZoomLevel);
      setLayoutDetails((prev) => ({ ...prev, displayScale: newZoomLevel }));
    }

    if (e.last) {
      timerId.current = setTimeout(async () => {
        try {
          const response = await editLayout(param.layoutIdParam, {
            displayScale: zoomLevel,
          });
          console.log("API Response:", response);
          setLayoutDetails((prev) => ({ ...prev, displayScale: zoomLevel }));
        } catch (error) {
          console.log("API Call Error:", error.response);
        }
        timerId.current = null;
      }, 1000);
    }
  };

  const handleOffSet = async (e) => {
    const { offset, axis, last } = e;
    const valueForAxis = axis === "x" ? offset[0] : offset[1];
    e.event.preventDefault();

    if (e.first && offSetTimer.current) {
      clearTimeout(offSetTimer.current);
      offSetTimer.current = null;
    }

    setLayoutDetails((prev) => ({
      ...prev,
      offSet: {
        ...prev.offSet,
        [axis]: valueForAxis,
      },
    }));

    if (last) {
      const currentOffsetX = offset[0];
      const currentOffsetY = offset[1];

      offSetTimer.current = setTimeout(async () => {
        try {
          const response = await editLayout(param.layoutIdParam, {
            offSet: { x: currentOffsetX, y: currentOffsetY },
          });
          console.log("API OffSet:", response.layout);
        } catch (error) {
          console.log("API Call Error:", error.response);
        }
        offSetTimer.current = null;
      }, 1000);
    }

    console.log("offSet:", offset);
    // console.log("layoutDetails:", layoutDetails);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (offSetTimer.current) {
        clearTimeout(offSetTimer.current);
      }
    };
  }, []);

  const pinch = useGesture(
    {
      onPinch: (e) => {
        handlePinch(e);
        // console.log("e:", e);
      },
      onWheel: (e) => {
        handleOffSet(e);
        console.log("scroll-e:", e);
      },
    },

    {
      domTarget: layoutRef,
      eventOptions: { passive: false },
      touchAction: "none",
      pointer: {
        touch: true,
      },
    }
  );

  useEffect(() => {
    if (pinch) pinch();

    // console.log("🚀 ~ EditModal ~ isCursorOver:", isCursorOver);
  }, [pinch, isCursorOver]);

  useEffect((e) => {
    const target = layoutRef?.current || null;

    const handleMouseEnter = () => setIsCursorOver(true);
    const handleMouseLeave = () => setIsCursorOver(false);

    if (target) {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

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
              <button onClick={(e) => handleZoomIncrease(0.05, e)}>+</button>
              <button>Zoom</button>
              <button onClick={(e) => handleZoomDecrease(0.05, e)}>-</button>
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
