import React, { useContext, useState } from "react";
import { LayoutContext } from "../context/layout.context";
import LayoutForm from "./Layouts/LayoutForm";

const EditModal = () => {
  const { toggleEditingModal } = useContext(LayoutContext);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const [layoutWidth, setLayoutWidth] = useState(400);
  const [layoutHeigth, setLayoutHeigth] = useState(370);
  const [borderSize, setBorderSize] = useState(2);
  const [borderRadius, setBorderRadius] = useState(2);

  const layoutWidthChange = (e) => {
    setLayoutWidth(e.target.value);
  };

  const layoutHeigthChange = (e) => {
    setLayoutHeigth(e.target.value);
  };

  const layoutBorderChange = (e) => {
    setBorderSize(e.target.value);
  };

  const layoutBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
  };

  return (
    <div className="modal-overlay" 
    // onClick={toggleEditingModal}
    >
      <div className="modal-content" onClick={handleContentClick}>
        <div className="icons-tabs-container-photoslider icons-editing-modal">
          <div
            className="icon-close icon-close-editing-modal"
            // onClick={toggleEditingModal}
          ></div>
        </div>
        <div className="photoslider-body editing-modal-body">
          <div
            style={{
              width: `${layoutWidth}px`,
              maxWidth: "370px",
              height: `${layoutHeigth}px`,
              maxHeight: "370px",
              border: `${borderSize}px solid black`,
              borderRadius: `${borderRadius}%`,
            }}
            className="layout-visible"
          >
            Layout body
          </div>

          <div>

            <h1 className="layout-tools-title">Layout - Tools</h1>

            <div className="values-container">
              <label htmlFor="width">Width</label>
              <input
                type="number"
                name="width"
                value={layoutWidth}
                onChange={layoutWidthChange}
              />
            </div>

            <div className="values-container">
              <label htmlFor="heigth">Heigth</label>
              <input
                type="number"
                name="heigth"
                value={layoutHeigth}
                onChange={layoutHeigthChange}
              />
            </div>

            <div className="values-container">
              <label htmlFor="border">Border</label>
              <input
                type="number"
                name="border"
                value={borderSize}
                onChange={layoutBorderChange}
              />
            </div>

            <div className="values-container">
              <label htmlFor="radius">Radius</label>
              <input
                type="number"
                name="radius"
                value={borderRadius}
                onChange={layoutBorderRadiusChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
