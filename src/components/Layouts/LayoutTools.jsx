import React, { useContext, useState, useEffect, useCallback } from "react";
import { LayoutContext } from "../../context/layout.context";
import { editLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";
import AddShape from "../Shapes/AddShape";

const LayoutTools = ({ children }) => {
  const { layoutDetails, layoutBody, setLayoutBody } =
    useContext(LayoutContext);
  const [hasChanged, setHasChanged] = useState(false);
  const param = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);

  useEffect(() => {
    setLayoutBody({
      width: layoutDetails?.width,
      maxWidth: layoutDetails?.maxWidth,
      height: layoutDetails?.height,
      maxHeight: layoutDetails?.maxHeight,
      borderRadius: layoutDetails?.borderRadius,
      borderSize: layoutDetails?.borderSize,
      x: layoutDetails?.x,
      y: layoutDetails?.y,
    });

    setHasChanged(false);
  }, [layoutDetails]);

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

  // const handleSaveLayoutDebounced = useCallback(
  //   debounce(async () => {
  //     try {
  //       const response = await editLayout(param.layoutIdParam, layoutBody);
  //       console.log("response after debounce", response);
  //       if (response.success) {
  //         setSuccessMessage(response.message);
  //       }

  //       setTimeout(() => {
  //         setSuccessMessage(null);
  //       }, 2000);

  //       setHasChanged(false);
  //     } catch (error) {
  //       console.log("The error:", error);
  //       setNotSuccessMessage(error.response.message);
  //       setTimeout(() => {
  //         setNotSuccessMessage(null);
  //       }, 2000);
  //     }
  //   }, 1000),
  //   [layoutBody]
  // );

  const handleSaveLayout = async () => {
    try {
      const response = await editLayout(param.layoutIdParam, layoutBody);
      // console.log("response after debounce", response);
      if (response.success) {
        setSuccessMessage(response.message);
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);

      setHasChanged(false);
    } catch (error) {
      console.log("The error:", error);
      setNotSuccessMessage(error.response.message);
      setTimeout(() => {
        setNotSuccessMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    debounce(handleSaveLayout(), 1000);
  }, [layoutBody]);

  // console.log("layoutbody:", layoutBody);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      [name]: value,
    }));
    setHasChanged(true);
  };

  return (
    <form className="layout-tools-container">
      <div className="layout-tools-spacing">
        <h1 className="layout-tools-title">Layout Tools</h1>
        <div className="layout-tools-content-container">
          <div className="layout-tools-content">
            <label htmlFor="width">Width</label>
            <input
              type="number"
              value={layoutBody.width}
              name="width"
              max={layoutBody.maxWidth}
              min={100}
              onChange={handleChange}
            />
          </div>

          <div className="layout-tools-content">
            <label htmlFor="height">height</label>
            <input
              type="number"
              name="height"
              value={layoutBody.height}
              max={layoutBody.maxHeight}
              min={100}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="layout-tools-content-container">
          <div className="layout-tools-content">
            <label htmlFor="borderSize">Border</label>
            <input
              type="number"
              name="borderSize"
              value={layoutBody.borderSize}
              min={1}
              onChange={handleChange}
            />
          </div>

          <div className="layout-tools-content">
            <label htmlFor="borderRadius">Radius</label>
            <input
              type="number"
              name="borderRadius"
              value={layoutBody.borderRadius}
              min={0}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="layout-tools-content-container">
          <div className="layout-tools-content">
            <label htmlFor="x">X</label>
            <input
              type="number"
              name="x"
              value={layoutBody.x}
              onChange={handleChange}
            />
          </div>

          <div className="layout-tools-content">
            <label htmlFor="y">Y</label>
            <input
              type="number"
              name="y"
              value={layoutBody.y}
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
  );
};

export default LayoutTools;
