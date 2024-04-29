import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOneLayout } from "../../services/layout.service";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";

const Hierarchy = () => {
  const param = useParams();
  const [layoutObject, setLayoutObject] = useState({});
  const {
    setShowBShapeForm,
    bShapeForm,
    bSquareRef,
    bCircleRef,
    setBlockId,
    bShapeAdded,
  } = useContext(BlockContext);
  const { setTShapeAdded, tShapeAdded } = useContext(TableContext);

  const getThisLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);
    if (response.success) {
      setLayoutObject(response.layout);
    }
    console.log("getThisLayout:", response);
  };

  useEffect(() => {
    getThisLayout();
    if (tShapeAdded) {
      setTShapeAdded(false);
    }
  }, [bShapeAdded, tShapeAdded]);

  const handleShowToggleForm = (bShapeId) => {
    setShowBShapeForm(true);
    setBlockId(bShapeId);
    bSquareRef?.current?.focus();
  };

  console.log("bSquareRef:", bSquareRef);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = event.target.closest(".block-square-shape");
      const isClickInsideCircle = event.target.closest(".block-circle-shape");

      if (
        !isClickInside &&
        !isClickInsideCircle &&
        bShapeForm.current &&
        !bShapeForm.current.contains(event.target)
      ) {
        setShowBShapeForm(false);
        setBlockId(null);
        // console.log("Square - Clicked Outside:");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bSquareRef, bShapeForm, bCircleRef]);

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
            <div className="hierarchy-tables-container">
              <h1
                className="hierarchy-blocks-name"
                onClick={() => handleShowToggleForm(block._id)}
              >
                {block.name}
              </h1>

              {block.tables.map((table) => (
                <div className="hierarchy-all-tables-effects-container">
                  <div className="hierarchy-vertical-blocks-container">
                    <div className="hierarchy-vertical-border-container">
                      <div className="hierarchy-vertical-table-border-effect"></div>
                      <div className="hierarchy-vertical-table-border-effect"></div>
                      <div className="hierarchy-vertical-table-border-effect"></div>
                      <div className="hierarchy-vertical-table-border-effect"></div>
                      <div className="hierarchy-vertical-table-border-effect"></div>
                    </div>

                    <div className="hierarchy-table-border-container">
                      <div className="hierarchy-table-border-effect"></div>
                      <div className="hierarchy-table-border-effect"></div>
                      <div className="hierarchy-table-border-effect"></div>
                      <div className="hierarchy-table-border-effect"></div>
                      <div className="hierarchy-table-border-effect"></div>
                    </div>
                    <h1 className="hierarchy-table-name">{table?.number}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hierarchy;
