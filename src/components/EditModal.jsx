import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutContext } from "../context/layout.context";
import LayoutContent from "./Layouts/LayoutContent";
import LayoutTools from "./Layouts/LayoutTools";
import DisplayShapes from "./Shapes/DisplayShapes";
import ShapesTools from "./Shapes/ShapesTools";

const EditModal = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { layoutDetails, setLayoutId, layoutId } = useContext(LayoutContext);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
  }, [layoutId]);

  return (
    <div>
      <button onClick={goBack} className="goback-btn-design">
        Go Back
      </button>

      <div className="design-container">
        <div className="design-header-container">
          <h1 id="design-layout-title">
            {layoutDetails && layoutDetails.name}
          </h1>
        </div>

        <div className="design-main-content">
          <LayoutContent>
            <DisplayShapes />
          </LayoutContent>

          <LayoutTools />
          <ShapesTools />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
