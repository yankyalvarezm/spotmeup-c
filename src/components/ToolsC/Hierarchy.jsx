import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOneLayout } from "../../services/layout.service";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { editBlock } from "../../services/block.service";

const Hierarchy = () => {
  const param = useParams();
  const [layoutObject, setLayoutObject] = useState({});
  const {
    setShowBShapeForm,
    showBShapeForm,
    bShapeForm,
    bSquareRef,
    bCircleRef,
    setBlockId,
    bShapeAdded,
    blockId,
    priceUpdated,
    setPriceUpdated,
    updateBShape,
    bCircles,
    bSquares,
  } = useContext(BlockContext);
  const {
    setTShapeAdded,
    tShapeAdded,
    tableId,
    showTShapeForm,
    tShapeForm,
    setShowTShapeForm,
    tCircleRef,
    setTableId,
    tSquareRef,
  } = useContext(TableContext);

  const getThisLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);
    if (response.success) {
      setLayoutObject(response.layout);
    }

    // console.log("getThisLayout:", response);
  };

  useEffect(() => {
    if (tShapeAdded) {
      setTShapeAdded(false);
      getThisLayout();
    }

    if (priceUpdated) {
      setPriceUpdated(false);
      getThisLayout();
    }

    getThisLayout();
  }, [bShapeAdded, tShapeAdded, priceUpdated]);

  const [isBlockFocus, setIsBlockFocus] = useState(false);

  const handleShowToggleForm = (bShapeId) => {
    setShowBShapeForm(true);
    setBlockId(bShapeId);
    setIsBlockFocus(true);
  };

  const handleShowToggleTable = (tableId) => {
    setShowBShapeForm(false);
    setShowTShapeForm(true);
    setTableId(tableId);
  };

  // console.log("bSquareRef:", bSquareRef);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = event.target.closest(".block-square-shape");
      const isClickInsideHierarchy = event.target.closest(
        ".hierarchy-blocks-name"
      );
      const isClickInsideHierarchyPrice = event.target.closest(
        ".hierarchy-blocks-price"
      );
      const isClickInsideCircle = event.target.closest(".block-circle-shape");

      if (
        !isClickInsideHierarchyPrice &&
        !isClickInsideHierarchy &&
        !isClickInside &&
        !isClickInsideCircle &&
        bShapeForm.current &&
        !bShapeForm.current.contains(event.target)
      ) {
        setShowBShapeForm(false);
        setBlockId(null);
        setIsBlockFocus(false);
        // console.log("Square - Clicked Outside:");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bSquareRef, bShapeForm, bCircleRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = event.target.closest(".square-shape");
      const isClickInsideCircle = event.target.closest(".circle-shape");
      const isClickInsideHierarchy = event.target.closest(
        ".hierarchy-container"
      );

      if (
        !isClickInsideHierarchy &&
        !isClickInside &&
        !isClickInsideCircle &&
        tShapeForm.current &&
        !tShapeForm.current.contains(event.target)
      ) {
        setShowTShapeForm(false);
        setTableId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tSquareRef, tShapeForm, tCircleRef]);

  const handleBlockInputChange = async (e, block) => {
    const { name, value } = e.target;

    let updatedBlock = { ...block, [name]: value };

    try {
      const response = await editBlock(block._id, updatedBlock);

      if (response.success) {
        getThisLayout();
      }

      console.log("editBlock:", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  // *! ----- Current Shape -----------------------------------
  const currentBShape = [...bCircles, ...bSquares].find(
    (block) => block._id === blockId
  );

  return (
    <div className="hierarchy-container">
      <div className="title-container-hierarchy">
        <h1 className="hierarchy-title">Layers</h1>
        <h1 className="hierarchy-title-two">Dashboard</h1>
      </div>
      <hr className="hierarchy-hr" />

      <h1 className="hierarchy-layout-name">{layoutObject.name}</h1>
      <div className="hierarchy-sub-container">
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
              <div
                className={
                  block._id === blockId && showBShapeForm && isBlockFocus
                    ? "hierarchy-tables-container hierarchy-highlight"
                    : "hierarchy-tables-container "
                }
              >
                <h1
                  className={
                    block._id === blockId && showBShapeForm && isBlockFocus
                      ? "hierarchy-blocks-name hierarchy-highlight"
                      : "hierarchy-blocks-name "
                  }
                  onClick={() => handleShowToggleForm(block._id)}
                >
                  {block.name}
                </h1>

                <h1 className="hierarchy-blocks-price">${block.bprice}</h1>

                <input
                  className="hierarchy-blocks-price"
                  type="number"
                  name="bprice"
                  value={block.bprice}
                  onChange={(e) => handleBlockInputChange(e, block)}
                />

                {block.tables.map((table) => (
                  <div className="hierarchy-all-tables-effects-container">
                    <div
                      className={
                        tableId === table._id && showTShapeForm
                          ? "hierarchy-vertical-blocks-container hierarchy-highlight"
                          : "hierarchy-vertical-blocks-container"
                      }
                    >
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
                      <h1
                        className="hierarchy-table-name"
                        onClick={() => handleShowToggleTable(table._id)}
                      >
                        {table?.number}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hierarchy;
