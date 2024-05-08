import React, { useContext, useState, useEffect } from "react";
import { StyledTSquare } from "./StyledTSquare";
import Draggable from "react-draggable";
import { TableContext } from "../../../context/table.context";
import { editTable } from "../../../services/table.service";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";
import { deleteTable } from "../../../services/table.service";
import { useNavigate, useParams } from "react-router-dom";
import { findBlock } from "../../../services/block.service";

const TsquareShape = ({
  tSquare,
  currentBlock,
  containerWidth,
  containerHeight,
}) => {
  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
  const { blockId, showBShapeForm, setPriceUpdated, getThisBlock } =
    useContext(BlockContext);
  const {
    setTSquares,
    updateTShape,
    setShowTShapeForm,
    tSquares,
    tSquareRef,
    tCircleRef,
    tShapeForm,
    setTableId,
    tableId,
    toggleTShapeForm,
    editingTables,
    setEditingTables,
    showTShapeForm,
  } = useContext(TableContext);
  const [actualBlock, setActualBlock] = useState(null);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);
  const navigate = useNavigate();
  const param = useParams();

  // console.log("containerWidht:", containerWidth);
  // console.log("containerHeight:", containerHeight);
  // console.log("tSquares:", tSquares);

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [tSquareName, setTSquareName] = useState(tSquare?.name);
  const [newPositionTSquare, setNewPositionTSquare] = useState({
    x: layoutBody.width / 2 - tSquare?.width / 2,
    y: layoutBody.height / 2,
  });
  const container = document.querySelector(".display-tables-container");

  const tableWidth =
    ((containerWidth + tSquare.borderSize) * 0.95) / actualBlock?.maxCol;
  const tableHeigth =
    ((containerHeight + tSquare.borderSize) * 0.95) / actualBlock?.maxRow;
  const positionSubRow = tSquare.row < 1 ? 0 : 1;
  const positionSubCol = tSquare.col < 1 ? 0 : 1;
  const rowGap = tSquare.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = tSquare.row > 1 ? tableWidth * 0.065 : 0;
  const newRow =
    Math.round(tSquare.y / (tableHeigth + colGap)) + positionSubCol;
  const newCol = Math.round(tSquare.x / (tableWidth + rowGap)) + positionSubRow;

  // --------- Find Block ------------ //

  const getTheActualBlock = async (blockId) => {
    try {
      const response = await findBlock(blockId);
      // console.log("getTheActualBlock:", response);
      if (response.success) {
        if (tSquare.block === blockId) {
          setActualBlock(response.block);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (blockId) {
      getTheActualBlock(blockId);
    }
    // console.log("BlockId", blockId);
    // console.log("actualBlock:", actualBlock)
  }, [blockId]);

  //*! ---------- Resize Observer for Width & Height -------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateTShape(tSquare._id, { width, height });

          if (tSquare.block === actualBlock?._id) {
            setTSquares((prevTSquares) => {
              return prevTSquares.map((tSq) => {
                if (tSq._id === tSquare._id) {
                  return { ...tSq, width, height };
                }
                return tSq;
              });
            });
          }
        }
      }
    });

    if (tSquareRef.current) {
      resizeObserver.observe(tSquareRef.current);
    }

    return () => {
      if (tSquareRef.current) {
        resizeObserver.unobserve(tSquareRef.current);
      }
    };
  }, []);

  //*! ------- Draggable Area Styles ---------------------------

  const handleStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: tSquare?.backgroundColor,
    cursor: "grab",
    color: "white",
    justifyContent: tSquare?.justifyContent,
    alignItems: tSquare?.alignItems,
    fontSize: `${tSquare?.fontSize}px`,
  };

  //*! ------- Edit TShape ---------------------------

  const handleEditShape = async (tableId, body) => {
    try {
      const response = await editTable(tableId, body);

      if (tSquare.block === actualBlock._id) {
        setTSquares((prev) => {
          return prev.map((tSquare) => {
            if (tSquare._id === tableId) {
              return {
                ...response.table,
                row: newRow,
                col: newCol,
              };
            } else {
              return tSquare;
            }
          });
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //*! -------- Handle Click Outside ------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = event.target.closest(".square-shape");
      const isClickInsideCircle = event.target.closest(".circle-shape");

      if (
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

  //*! --------------- Show & Hide Form --------------

  const handleShowToggleForm = (tShapeId) => {
    setShowTShapeForm(true);
    setTableId(tShapeId);
  };

  //*! -------------- On Drag Logic ----------------

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    setHasMoved(true);
    setNewPositionTSquare(newPosition);
    setTSquares((prevTSquares) =>
      prevTSquares.map((t) =>
        t._id === tSquare._id ? { ...t, x: newPosition.x, y: newPosition.y } : t
      )
    );
  };

  //*! -------------- Update Table Position ----------------

  useEffect(() => {
    const rowsGap = newCol > 1 ? tableWidth * 0.065 : 0;
    const columnGap = newRow > 1 ? tableWidth * 0.065 : 0;

    const updateTableDetails = async () => {
      if (
        containerWidth &&
        containerHeight &&
        actualBlock &&
        tSquare.block === actualBlock._id &&
        tSquare._id
      ) {
        // Primero actualizamos el estado local
        setTSquares((prevSquares) =>
          prevSquares.map((tSqr) =>
            tSqr._id === tSquare._id
              ? {
                  ...tSqr,
                  width: tableWidth,
                  height: tableHeigth,
                  x: (tableWidth + rowsGap) * (tSquare.col - positionSubRow),
                  y: (tableHeigth + columnGap) * (tSquare.row - positionSubCol),
                  name: tSquare.number,
                  containerWidth: containerWidth / actualBlock?.maxCol,
                  containerHeight: containerHeight / actualBlock?.maxRow,
                }
              : tSqr
          )
        );

        try {
          setEditingTables(true);
          const response = await editTable(tSquare._id, {
            width: tableWidth,
            height: tableHeigth,
            x: (tableWidth + rowsGap) * (tSquare.col - positionSubRow),
            y: (tableHeigth + columnGap) * (tSquare.row - positionSubCol),
            containerWidth: containerWidth / actualBlock?.maxCol,
            containerHeight: containerHeight / actualBlock?.maxRow,
          });

          if (response.success) {
            setTimeout(() => {
              setEditingTables(false);
            }, 10000);
          }
        } catch (error) {
          console.error("Failed to update table:", error);
        }
      }
    };

    updateTableDetails();
  }, [
    blockId,
    tSquare._id,
    tableId,
    containerWidth,
    containerHeight,
    actualBlock,
  ]);

  useEffect(() => {
    // console.log('Lista de tSquares:', tSquares);
  }, [tSquares]);

  const deleteTheShape = async (tableId) => {
    try {
      const response = await deleteTable(tableId);
      console.log("Table Deleted:", response);
      // setTCircles((prev) => {
      //   return prev.filter((tCircle) => tCircle._id !== tableId);
      // });
      setTSquares((prev) => {
        return prev.filter((tSquare) => tSquare._id !== tableId);
      });
      setTableId(null);
      navigate(`/admin/designpage/${param.layoutIdParam}`);
      // debugger;
      toggleTShapeForm();
      setPriceUpdated(true);
      getThisBlock(tSquare.block);
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  return (
    <Draggable
      bounds="parent"
      handle=".table-handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
      }}
      position={{
        x: tSquare?.x,
        y: tSquare?.y,
      }}
      onStop={(e, ui) => {
        if (hasMoved) {
          handleEditShape(tSquare._id, newPositionTSquare);
          setHasMoved(false);
        }
      }}
      grid={[tSquare.containerWidth, tSquare.containerHeight]}
    >
      <StyledTSquare
        ref={tSquareRef}
        tabIndex={1}
        // onMouseEnter={() => setTableId(tSquare._id)}
        onClick={() => {
          handleShowToggleForm(tSquare._id);
        }}
        tSquare={tSquare}
        className={
          tableId === tSquare._id && showTShapeForm && !showBShapeForm
            ? "square-shape tables-shape focus-block"
            : "square-shape tables-shape"
        }
      >
        <div
          className="table-handle circle-name tables-one-shape"
          style={handleStyle}
          onDoubleClick={() => {}}
        >
          <h1
            className="delete-tables-before"
            onClick={() => deleteTheShape(tableId)}
          >
            X
          </h1>
          <h1>{tSquare.number}</h1>
        </div>
      </StyledTSquare>
    </Draggable>
  );
};

export default TsquareShape;
