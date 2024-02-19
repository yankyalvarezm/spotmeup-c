import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "../../context/layout.context";
import { editLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";

const LayoutTools = () => {
  const { layoutDetails, layoutBody, setLayoutBody } =
    useContext(LayoutContext);
  const [hasChanged, setHasChanged] = useState(false);
  const param = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);

  console.log("from layout tools:", layoutDetails);
  console.log("layoutBody:", layoutBody);

  console.log("param", param);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      [name]: value,
    }));
    setHasChanged(true);
  };

  const handleSaveLayout = async (e) => {
    e.preventDefault();
    try {
      const response = await editLayout(param.layoutIdParam, layoutBody);
      console.log("response", response);
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

  return (
    <form className="layout-tools-container" onSubmit={handleSaveLayout}>
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
            max = {layoutBody.maxHeight}
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

      {hasChanged && (
        <button className="layout-tools-savechanges" type="submit">
          Save Changes
        </button>
      )}

      {successMessage && (
        <h1 className="layout-tools-success">{successMessage}</h1>
      )}
      {notSuccessMessage && (
        <h1 className="layout-tools-Notsuccess">{notSuccessMessage}</h1>
      )}
    </form>
  );
};

export default LayoutTools;
