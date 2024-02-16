import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "../../context/layout.context";

const LayoutTools = () => {
  const { layoutDetails } = useContext(LayoutContext);
  
  console.log("from layout tools:", layoutDetails);
  const [layoutBody, setLayoutBody] = useState({});
  console.log("layoutBody:", layoutBody);
  
  useEffect(()=>{
    setLayoutBody({
      width: layoutDetails?.width,
      height: layoutDetails?.height,
      borderRadius: layoutDetails?.borderRadius,
      borderSize: layoutDetails?.borderSize,
    })
  },[layoutDetails])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      [name]: value,
    }));
  };

  return (
    <div className="layout-tools-container">
      <div className="layout-tools-content-container">
        <div className="layout-tools-content">
          <label htmlFor="width">Width</label>
          <input
            type="number"
            value={layoutBody.width}
            name="width"
            onChange={handleChange}
          />
        </div>

        <div className="layout-tools-content">
          <label htmlFor="height">height</label>
          <input
            type="number"
            name="height"
            value={layoutBody.height}
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
            onChange={handleChange}
          />
        </div>

        <div className="layout-tools-content">
          <label htmlFor="borderRadius">Radius</label>
          <input
            type="number"
            name="borderRadius"
            value={layoutBody.borderRadius}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutTools;
