import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneLayout } from "../../services/layout.service";

const Hierarchy = () => {
  const param = useParams();
  const [layoutObject, setLayoutObject] = useState({});

  const getThisLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);
    if (response.success) {
      setLayoutObject(response.layout);
    }
    console.log("getThisLayout:", response);
  };

  useEffect(() => {
    getThisLayout();
  }, []);

  return (
    <div className="hierarchy-container">
      <h1 className="hierarchy-title">Layers</h1>
      <hr className="hierarchy-hr" />

      <h1 className="hierarchy-layout-name">{layoutObject.name}</h1>

      {layoutObject?.blocks?.map((block) => (
        <div className="hierarchy-all-effects-container">
          <div className="hierarchy-vertical-blocks-container">
            <div className="hierarchy-vertical-border-container">
              <div className="hierarchy-vertical-border-effect"></div>
              <div className="hierarchy-vertical-border-effect"></div>
              <div className="hierarchy-vertical-border-effect"></div>
              <div className="hierarchy-vertical-border-effect"></div>
              <div className="hierarchy-vertical-border-effect"></div>
            </div>
            
            <div className="hierarchy-border-container">
              <div className="hierarchy-border-effect"></div>
              <div className="hierarchy-border-effect"></div>
              <div className="hierarchy-border-effect"></div>
              <div className="hierarchy-border-effect"></div>
              <div className="hierarchy-border-effect"></div>
            </div>
            <h1 className="hierarchy-blocks-name">{block.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hierarchy;
