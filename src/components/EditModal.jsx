import React, { useContext, useEffect } from "react";
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
  } = useContext(LayoutContext);

  const { showBShapeForm, bShapeForm } = useContext(BlockContext);

  const { showShapeForm } = useContext(ShapeContext);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
  }, [layoutId]);

  // console.log("showShapeForm:", showShapeForm);

  useEffect(() => {
    // console.log("bShapeForm:", bShapeForm.current);
  }, [showBShapeForm]);

  // console.log("floorplan --->", floorPlan);
  // console.log("layoutType --->", layoutDetails);

  return (
    <div className="design-big-container">
      <button onClick={goBack} className="goback-btn-design">
        Go Back
      </button>
      <div className="tools-title">
        <div className="design-container">
          <div className="design-header-container">
            <h1 id="design-layout-title">
              {layoutDetails && layoutDetails.name}
            </h1>
          </div>

          <div className="design-main-content">
            <LayoutContent>
              <DisplayShapes />
              <DisplayBlocks />
            </LayoutContent>
          </div>
        </div>
        <ShapesTools />
        <BlockTools>
          <BlockGridSetUp/>
        </BlockTools>
        {!showShapeForm && !showBShapeForm && (
          <div
            className={
              floorPlan || layoutBody.layoutType
                ? "active-tools"
                : "tools-container"
            }
          >
            <LayoutTools>
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
