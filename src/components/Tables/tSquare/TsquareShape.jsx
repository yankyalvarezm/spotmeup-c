import React, { useContext, useState, useEffect } from "react";
import { StyledTSquare } from "./StyledTSquare";
import Draggable from "react-draggable";
import { TableContext } from "../../../context/table.context";
import { editTable } from "../../../services/table.service";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";
import { deleteTable } from "../../../services/table.service";
import { useNavigate, useParams } from "react-router-dom";

const TsquareShape = ({ tSquare }) => {
  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
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
  } = useContext(TableContext);
  const { currentBlock } = useContext(BlockContext);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);
  const navigate = useNavigate();
  const param = useParams();

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [tSquareName, setTSquareName] = useState(tSquare?.name);
  const [newPositionTSquare, setNewPositionTSquare] = useState({
    x: layoutBody.width / 2 - tSquare?.width / 2,
    y: layoutBody.height / 2,
  });
  const container = document.querySelector(".display-tables-container");

  const tableWidth =
    ((container?.offsetWidth + tSquare.borderSize) * 0.95) /
    currentBlock?.maxCol;
  const tableHeigth =
    ((container?.offsetHeight + tSquare.borderSize) * 0.95) /
    currentBlock?.maxRow;
  const positionSubRow = tSquare.row < 1 ? 0 : 1;
  const positionSubCol = tSquare.col < 1 ? 0 : 1;
  const rowGap = tSquare.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = tSquare.row > 1 ? tableWidth * 0.065 : 0;
  const newRow =
    Math.round(tSquare.y / (tableHeigth + colGap)) + positionSubCol;
  const newCol = Math.round(tSquare.x / (tableWidth + rowGap)) + positionSubRow;

  //*! ---------- Resize Observer for Width & Height -------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateTShape(tSquare._id, { width, height });

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
        // setCurrentBlock(null);
        // saveName();
        // console.log("Square - Clicked Outside:");
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
    if (container && currentBlock) {
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
              }
            : tSqr
        )
      );
      // }
    }
  }, [
    currentBlock,
    tSquare._id,
    tableId,
    container?.offsetWidth,
    container?.offsetHeight,
  ]);

  useEffect(() => {
    // console.log("--------------------------------");
    // console.log("tableWidth:", tableWidth);
    // console.log("colGap:", colGap);
    // console.log("rowGap:", rowGap);
    // console.log("newRow:", newRow);
    // console.log("newCol:", newCol);
    // console.log("positionSubCol:", positionSubCol);
    // console.log("positionSubRow:", positionSubRow);
    // // console.log("gridX:", gridX);
    // // console.log("gridY:", gridY);
    // console.log("tSquare Object:", tSquare);
    // console.log("--------------------------------");
  }, [
    currentBlock,
    tSquare._id,
    tableId,
    container?.offsetWidth,
    container?.offsetHeight,
    newCol,
    newRow,
    colGap,
    rowGap,
    positionSubCol,
    positionSubRow,
  ]);

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
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  // console.log("tSquare:", tSquare);
  // console.log("tableId:", tableId);
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
      grid={[
        container?.offsetWidth / currentBlock?.maxCol,
        container?.offsetHeight / currentBlock?.maxRow,
      ]}
      >
      <StyledTSquare
        ref={tSquareRef}
        tabIndex={1}
        onMouseEnter={() => setTableId(tSquare._id)}
        onClick={() => {
          handleShowToggleForm(tSquare._id);
        }}
        tSquare={tSquare}
        className="square-shape tables-shapes"
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
