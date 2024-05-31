import React, { useContext, useState, useEffect, useCallback } from "react";
import { LayoutContext } from "../../context/layout.context";
import { editLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";
import AddShape from "../Shapes/AddShape";

const LayoutTools = ({ children }) => {
  const {
    layoutDetails,
    layoutBody,
    setLayoutBody,
    floorPlan,
    setFloorPlan,
    setLayoutDetails,
    setIsSelected,
  } = useContext(LayoutContext);
  const [hasChanged, setHasChanged] = useState(false);
  const param = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);

  const designContainer = document.querySelector(".design-container");

  // console.log("designContainer - width:", designContainer?.offsetWidth);
  // console.log("designContainer - height:", designContainer?.offsetHeight);

  useEffect(() => {
    setLayoutBody({
      width: layoutDetails?.width,
      maxWidth: designContainer?.offsetWidth,
      height: layoutDetails?.height,
      maxHeight: designContainer?.offsetHeight * 0.93,
      borderRadius: layoutDetails?.borderRadius,
      borderSize: layoutDetails?.borderSize,
      containerScale: layoutDetails?.containerScale,
      x: layoutDetails?.x,
      y: layoutDetails?.y,
      layoutType: layoutDetails?.layoutType,
    });

    setHasChanged(false);
  }, [layoutDetails]);

  useEffect(() => {
    const designContainer = document.querySelector(".design-container");
    if (designContainer) {
      setLayoutBody((prevLayoutBody) => ({
        ...prevLayoutBody,
        maxWidth: designContainer.offsetWidth,
        maxHeight: designContainer.offsetHeight * 0.93,
      }));
    }
  }, [layoutBody.height, layoutBody.width]);

  // console.log("layoutBody:", layoutBody);
  const handleFloorPlanSelect = async (floorPlanType) => {
    // debugger;
    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      layoutType: floorPlanType,
    }));

    setLayoutDetails((prevLayoutBody) => ({
      ...prevLayoutBody,
      layoutType: floorPlanType,
    }));

    setFloorPlan(true);
    setIsSelected((prev) => !prev);
  };

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }



  const handleSaveLayout = async () => {
    let layoutBodyEdited = layoutDetails;

    delete layoutBodyEdited?.blocks;

    try {
      const response = await editLayout(param.layoutIdParam, layoutBodyEdited);
      if (response.success) {
        setSuccessMessage(response.message);
        // console.log("layout updated:", response);
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);

      setHasChanged(false);
    } catch (error) {
      console.log("The error:", error.response);
      setNotSuccessMessage(error.response.message);
      setTimeout(() => {
        setNotSuccessMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    debounce(handleSaveLayout(), 1000);
  }, [hasChanged, floorPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      [name]: value,
    }));

    setHasChanged(true);
  };

  // *! ----- Local States ------------------------------------
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState("border");

  // *! ----- DropDown Logic -----------------------------------
  const handleDropDown = (number) => {
    setActiveDropDown((activeDropDown) => {
      return activeDropDown === number ? null : number;
    });
  };

  return (
    <div>
      <form
        className={
          floorPlan || layoutBody.layoutType
            ? "layout-tools-container"
            : "layout-tools-container hide"
        }
      >
        <h1 className="layout-tools-title">Layout Tools</h1>
        <div className="layout-tools-spacing">
          <div className="dropdown-container" onClick={() => handleDropDown(1)}>
            <h1 className="layout-text-input-title">Size & Color</h1>
            <div
              className={activeDropDown === 1 ? "down-arrow" : "up-arrow"}
            ></div>
          </div>
          {/* -------- Field #1 ----------- */}
          <div
            className={activeDropDown === 1 ? "show-dropdown" : "hide-dropdown"}
          >
            <div className="layout-input-range-container">
              <div className="layout-tools-content">
                <label htmlFor="width">Width</label>
                <input
                  type="number"
                  value={layoutBody.width}
                  name="width"
                  min={100}
                  max={layoutBody.maxWidth}
                  onChange={handleChange}
                />
              </div>

              <input
                type="range"
                className="range"
                name="width"
                onChange={handleChange}
                value={layoutBody?.width}
                min={10}
                max={layoutBody.maxWidth}
              />
            </div>

            <div className="layout-input-range-container">
              <div className="layout-tools-content">
                <label htmlFor="height">height</label>
                <input
                  type="number"
                  value={layoutBody.height}
                  name="height"
                  onChange={handleChange}
                  min={100}
                  max={layoutBody.maxHeight}
                />
              </div>

              <input
                type="range"
                className="range"
                name="height"
                onChange={handleChange}
                value={layoutBody?.height}
                min={10}
                max={layoutBody.maxHeight}
              />
            </div>

            <div className="layout-background-input-container">
              <input
                type="color"
                className="layout-background-input"
                value={layoutBody.backgroundColor}
                name="backgroundColor"
                defaultValue="trans"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* {successMessage && (
          <h1 className="layout-tools-success">{successMessage}</h1>
        )} */}
          {notSuccessMessage && (
            <h1 className="layout-tools-Notsuccess">{notSuccessMessage}</h1>
          )}
        </div>
        {children}
      </form>

      <div
        className={
          floorPlan || layoutBody.layoutType
            ? "hide"
            : "select-floorplan-container"
        }
      >
        <h1 className="floorplan-title">Select A Floor Plan</h1>

        <div className="floorplan-shapes-container">
          <div
            className="floorplan-square"
            onClick={() => handleFloorPlanSelect("square")}
          ></div>
          <div
            className="floorplan-circle"
            onClick={() => handleFloorPlanSelect("circle")}
          ></div>
          <div className="floorplan-ellipse-border">
            <div
              className="floorplan-ellipse"
              onClick={() => handleFloorPlanSelect("ellipse")}
            ></div>
          </div>
          <div className="floorplan-triangle-border">
            <div
              className="floorplan-triangle"
              onClick={() => handleFloorPlanSelect("triangle")}
            ></div>
          </div>
          <div className="floorplan-poligon-1-border">
            <div
              className="floorplan-poligon-1"
              onClick={() => handleFloorPlanSelect("poligon-1")}
            ></div>
          </div>
          <div
            className="floorplan-poligon-2-border"
            onClick={() => handleFloorPlanSelect("poligon-2")}
          >
            <div className="floorplan-poligon-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTools;
