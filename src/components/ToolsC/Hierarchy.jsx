import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOneLayout } from "../../services/layout.service";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { editBlock } from "../../services/block.service";
import { editTable } from "../../services/table.service";

const Hierarchy = () => {
  const param = useParams();

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
    setBCircles,
    setBSquares,
    layoutObject,
    setLayoutObject,
    blockDeleted,
    setBlockDeleted,
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
    tCircles,
    tSquares,
    setTCircles,
    setTSquares,
    updateTShape,
  } = useContext(TableContext);
  // console.log("🚀 ~ Hierarchy ~ tableId:", tableId);

  const getThisLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);
    if (response.success) {
      setLayoutObject(response.layout);
      // console.log("response.layout:", response.layout);
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
    }

    if (blockDeleted) {
      setBlockDeleted(false);
    }

    getThisLayout();
  }, [bShapeAdded, tShapeAdded, priceUpdated, blockDeleted]);

  const [isBlockFocus, setIsBlockFocus] = useState(false);

  const handleShowToggleForm = (bShapeId) => {
    setShowBShapeForm(true);
    setBlockId(bShapeId);
    setIsBlockFocus(true);
  };

  const handleShowToggleTable = (tShapeId) => {
    setShowBShapeForm(false);
    setShowTShapeForm(true);
    setTableId(tShapeId);
  };

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

  // ! ---------- Handle Block Change ------------

  const currentBShape = [...bCircles, ...bSquares].find(
    (block) => block._id === blockId
  );

  // console.log("currentBShape:", currentBShape);

  const handleBlockInputChange = async (e) => {
    const { name, value } = e.target;

    const updatedBlocks = await Promise.all(
      layoutObject?.blocks?.map((block) => {
        if (block._id === blockId) {
          const updatedValue = Number(value);
          // console.log("Number(value):", updatedValue);
          const beforeUpdate = { ...block, [name]: updatedValue };

          editBlock(blockId, beforeUpdate, "Edit Block Hierarchy");
          // console.log("Edit Block - Hierarchy:", response);

          return beforeUpdate;
        } else {
          return block;
        }
      })
    );

    setLayoutObject((prevLayoutObject) => ({
      ...prevLayoutObject,
      blocks: updatedBlocks,
    }));

    if (currentBShape?.blockType.toLowerCase() === "circle") {
      setBCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === blockId ? { ...circle, [name]: Number(value) } : circle
        )
      );
    }

    if (currentBShape?.blockType.toLowerCase() === "square") {
      setBSquares((prevCircles) =>
        prevCircles.map((square) =>
          square._id === blockId ? { ...square, [name]: Number(value) } : square
        )
      );
    }
  };

  const currentTShape = [...tCircles, ...tSquares].find(
    (table) => table._id === tableId
  );

  // console.log("layoutObject Hierarchy:", layoutObject);

  // ! ------------ Handle Table Change ----------------

  const handleTableInputChange = (e) => {
    const { name, value } = e.target;

    setLayoutObject((prevLayout) => {
      return {
        ...prevLayout,
        blocks: prevLayout.blocks.map((block) => {
          const updatedTables = block.tables.map((table) => {
            if (table._id === tableId) {
              console.log("🚀 ~ updatedTables ~ tableId:", tableId);
              const beforeUpdate = { ...table, [name]: value };
              editTable(tableId, beforeUpdate);
              return { ...table, [name]: value };
            }
            return table;
          });
          return { ...block, tables: updatedTables };
        }),
      };
    });

    if (currentTShape?.tableType.toLowerCase() === "circle") {
      setTCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle._id === tableId ? { ...circle, [name]: value } : circle
        )
      );
    }

    if (currentTShape?.tableType.toLowerCase() === "square") {
      setTSquares((prevCircles) =>
        prevCircles.map((square) =>
          square._id === tableId ? { ...square, [name]: value } : square
        )
      );
    }
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="hierarchy-container">
      <div className="title-container-hierarchy">
        <h1 className="hierarchy-title">Layers</h1>
        {/* <h1 className="hierarchy-title-two">Dashboard</h1> */}
      </div>
      {/* <hr className="hierarchy-hr" /> */}

      <h1 className="hierarchy-layout-name">{layoutObject.name}</h1>
      <div className="hierarchy-sub-container">
        {/* --------------------- Block ---------------------- */}
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
                  block?._id === blockId && showBShapeForm && isBlockFocus
                    ? "hierarchy-tables-container hierarchy-highlight"
                    : "hierarchy-tables-container "
                }
              >
                <h1
                  className={
                    block?._id === blockId && showBShapeForm && isBlockFocus
                      ? "hierarchy-blocks-name hierarchy-highlight"
                      : "hierarchy-blocks-name "
                  }
                  onClick={() => handleShowToggleForm(block?._id)}
                >
                  {block?.name}
                </h1>

                {block?.isMatched && block?.btickets < 1 && (
                  <h1 className="dollar-sign">$</h1>
                )}

                {block?.isMatched && block?.tables?.length > 0 && (
                  <input
                    className="hierarchy-blocks-price"
                    type="number"
                    name="bprice"
                    value={block?.bprice}
                    onClick={() => handleShowToggleForm(block?._id)}
                    onChange={(e) => handleBlockInputChange(e)}
                  />
                )}

                {block?.tables?.length < 1 && block?.btickets < 1 && (
                  <input
                    className="hierarchy-blocks-price none-events"
                    type="number"
                    name="bprice"
                    value={block?.bprice * block?.btickets}
                    onClick={() => handleShowToggleForm(block?._id)}
                    onChange={(e) => handleBlockInputChange(e)}
                  />
                )}

                {/* --------------------- Block Tickets --------------------- */}
                {block?.tables?.length < 1 && (
                  <div className="hierarchy-all-tables-effects-container">
                    <div
                      className={
                        blockId === block._id && showTShapeForm
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
                      <div>
                        <h1
                          className="hierarchy-table-name hierarchy-tickets-position"
                          onClick={() => handleShowToggleForm(block._id)}
                        >
                          <div className="ticket-icon"></div>
                        </h1>
                      </div>
                      <div className="hierarchy-tickets">
                        <h1 className="hierarchy-tickets-name">
                          {block?.btickets}
                        </h1>
                      </div>

                      <h1 className="dollar-sign-table-two">$</h1>
                      {/* {block?.isMatched && (
                        <h1 className="lock-sign-table">🔓</h1>
                      )} */}

                      <input
                        className="hierarchy-ticket-price-position"
                        type="number"
                        name="bprice"
                        value={block?.bprice}
                        onClick={() => handleShowToggleForm(block?._id)}
                        onChange={(e) => handleBlockInputChange(e)}
                      />
                    </div>
                  </div>
                )}

                {/* --------------------- Tables ---------------------------- */}

                {block?.tables?.map((table) => (
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
                      <h1 className="dollar-sign-table">$</h1>
                      {block?.isMatched && (
                        <h1 className="lock-sign-table">🔓</h1>
                      )}

                      <input
                        className={
                          block?.isMatched
                            ? "hierarchy-table-price none-events"
                            : "hierarchy-table-price "
                        }
                        onClick={() => handleShowToggleTable(table._id)}
                        onChange={(e) => handleTableInputChange(e)}
                        type="number"
                        name="tprice"
                        value={
                          block?.isMatched
                            ? Math.ceil(block.bprice / block?.tables.length)
                            : table.tprice
                        }
                      />
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
