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
import DisplayTables from "./Tables/DisplayTables";
import { TableContext } from "../context/table.context";
import TableTools from "./Tables/TableTools";

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

  const { showBShapeForm } = useContext(BlockContext);
  const { showShapeForm } = useContext(ShapeContext);
  const { showTShapeForm, editingTables, setEditingTables } =
    useContext(TableContext);

  const goBack = () => {
    if(!editingTables){
      navigate(`/admin/venuedetails/${layoutDetails.venue}`);
    }
  };

  // console.log("layoutDetails:", layoutDetails);
  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
  }, [layoutId]);

  useEffect(() => {}, [showBShapeForm]);

  return (
    <div className="design-big-container">
      <button
        onClick={goBack}
        className={!editingTables ? "goback-btn-design" : "load-goback"}
      >
        {!editingTables ? "Go Back" : "Saving..."} 
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
