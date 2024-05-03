import React, { useContext, useState, useEffect, useRef } from "react";
import { StyledtCircle } from "./StyledtCircle";
import Draggable from "react-draggable";
import { TableContext } from "../../../context/table.context";
import { editTable } from "../../../services/table.service";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";
import { deleteTable } from "../../../services/table.service";
import { useNavigate, useParams } from "react-router-dom";
import { findBlock } from "../../../services/block.service";
const TcircleShape = ({
  tCircle,
  currentBlock,
  containerWidth,
  containerHeight,
}) => {
  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
  const { blockId } = useContext(BlockContext);
  const {
    setTCircles,
    updateTShape,
    setShowTShapeForm,
    tCircles,
    tSquareRef,
    tCircleRef,
    tShapeForm,
    setTableId,
    tableId,
    toggleTShapeForm,
    setEditingTables,
  } = useContext(TableContext);
  const [actualBlock, setActualBlock] = useState(null);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);
  const navigate = useNavigate();
  const param = useParams();
  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [tSquareName, setTSquareName] = useState(tCircle?.name);
  const [newPositionTCircle, setNewPositionTCircle] = useState({
    x: layoutBody.width / 2 - tCircle?.width / 2,
    y: layoutBody.height / 2,
  });
  const container = document.querySelector(".display-tables-container");

  const tableWidth =
    ((containerWidth + tCircle.borderSize) * 0.95) / actualBlock?.maxCol;
  const tableHeigth =
    ((containerHeight + tCircle.borderSize) * 0.95) / actualBlock?.maxRow;

  const positionSubRow = tCircle.row < 1 ? 0 : 1;
  const positionSubCol = tCircle.col < 1 ? 0 : 1;
  const rowGap = tCircle.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = tCircle.row > 1 ? tableWidth * 0.065 : 0;

  const newRow =
    Math.round(tCircle.y / (tableHeigth + colGap)) + positionSubCol;
  const newCol = Math.round(tCircle.x / (tableWidth + rowGap)) + positionSubRow;
  // --------- Find Block ------------ //

  const getTheActualBlock = async (blockId) => {
    try {
      const response = await findBlock(blockId);
      // console.log("getTheActualBlock:", response);
      if (response.success) {
        if (tCircle.block === blockId) {
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
      // console.log("HITTT");
    }
  }, [blockId]);

  //*! ---------- Resize Observer for Width & Height -------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateTShape(tCircle._id, { width, height });
          if (tCircle.block === actualBlock?._id) {
            setTCircles((prevTCircles) => {
              return prevTCircles.map((tCr) => {
                if (tCr._id === tCircle._id) {
                  return { ...tCr, width, height };
                }
                return tCr;
              });
            });
          }
        }
      }
    });

    if (tCircleRef.current) {
      resizeObserver.observe(tCircleRef.current);
    }

    return () => {
      if (tCircleRef.current) {
        resizeObserver.unobserve(tCircleRef.current);
      }
    };
  }, []);

  //*! ------- Draggable Area Styles ---------------------------

  const handleStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: tCircle?.backgroundColor,
    cursor: "grab",
    color: "white",
    borderRadius: "50%",
    justifyContent: tCircle?.justifyContent,
    alignItems: tCircle?.alignItems,
    fontSize: `${tCircle?.fontSize}px`,
  };

  //*! ------- Edit TShape ---------------------------

  // console.log("newRow:", newRow);
  // console.log("newCol:", newCol);
  // console.log("tCircle:", tCircle);

  const handleEditShape = async (tableId, body) => {
    try {
      const response = await editTable(tableId, body);

      if (tCircle.block === actualBlock._id) {
        setTCircles((prev) => {
          return prev.map((tCircle) => {
            if (tCircle._id === tableId) {
              return { ...response.table, row: newRow, col: newCol };
            } else {
              return tCircle;
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
      const isClickInside = event.target.closest(".tables-shapes");

      const isClickInsideCircle = event.target.closest(".tables-shapes");

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
    setNewPositionTCircle(newPosition);
    setTCircles((prevTCircles) =>
      prevTCircles.map((c) =>
        c._id === tCircle._id ? { ...c, x: newPosition.x, y: newPosition.y } : c
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
        tCircle.block === actualBlock._id &&
        tCircle._id
      ) {
        // Primero actualizamos el estado local
        setTCircles((prevCircles) =>
          prevCircles.map((Crq) =>
            Crq._id === tCircle._id
              ? {
                  ...Crq,
                  width: tableWidth,
                  height: tableHeigth,
                  x: (tableWidth + rowsGap) * (tCircle.col - positionSubRow),
                  y: (tableHeigth + columnGap) * (tCircle.row - positionSubCol),
                  name: tCircle.number,
                  containerWidth: containerWidth / actualBlock?.maxCol,
                  containerHeight: containerHeight / actualBlock?.maxRow,
                }
              : Crq
          )
        );

        try {
          setEditingTables(true);
          const response = await editTable(tCircle._id, {
            width: tableWidth,
            height: tableHeigth,
            x: (tableWidth + rowsGap) * (tCircle.col - positionSubRow),
            y: (tableHeigth + columnGap) * (tCircle.row - positionSubCol),
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
    tCircle._id,
    tableId,
    containerWidth,
    containerHeight,
    actualBlock,
  ]);

  // console.log("tCircles:", tCircles);

  const deleteTheShape = async (tableId) => {
    try {
      const response = await deleteTable(tableId);
      console.log("Table Deleted:", response);
      // setTCircles((prev) => {
      //   return prev.filter((tCircle) => tCircle._id !== tableId);
      // });
      setTCircles((prev) => {
        return prev.filter((tCircle) => tCircle._id !== tableId);
      });
      setTableId(null);
      navigate(`/admin/designpage/${param.layoutIdParam}`);
      getThisBlock(tCircle.block);
      // debugger;
      toggleTShapeForm();
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  // console.log(tCircleRef.current);

  // *! ------------------- DOM ----------------------------
  // *! ------------------- DOM ----------------------------
  // *! ------------------- DOM ----------------------------

  return (
    <Draggable
      bounds="parent"
      handle=".table-handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
      }}
      position={{
        x: tCircle?.x,
        y: tCircle?.y,
      }}
      onStop={(e, ui) => {
        if (hasMoved) {
          handleEditShape(tCircle._id, newPositionTCircle);
          setHasMoved(false);
        }
      }}
      grid={[
        containerWidth / actualBlock?.maxCol,
        containerHeight / actualBlock?.maxCol,
      ]}
    >
      <StyledtCircle
        ref={tCircleRef}
        tabIndex={1}
        onMouseEnter={() => setTableId(tCircle._id)}
        onClick={() => {
          handleShowToggleForm(tCircle._id);
        }}
        tCircle={tCircle}
        className="circle-shape tables-shapes"
      >
        <div
          className="table-handle circle-name tables-one-shape"
          style={handleStyle}
          onDoubleClick={() => {}}
        >
          <h1>{tCircle.number}</h1>
          <h1
            className="delete-tables-before"
            onClick={() => deleteTheShape(tableId)}
          >
            X
          </h1>
        </div>
      </StyledtCircle>
    </Draggable>
  );
};

export default TcircleShape;
