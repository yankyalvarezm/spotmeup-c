import React, { useContext, useState, useEffect, useRef } from "react";
import { StyledTCircle } from "./StyledTCircle";
import Draggable from "react-draggable";
import { TableContext } from "../../../context/table.context";
import { editTable } from "../../../services/table.service";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";

const TcircleShape = ({ tCircle }) => {
  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
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
  } = useContext(TableContext);
  const { currentBlock } = useContext(BlockContext);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [tSquareName, setTSquareName] = useState(tCircle?.name);
  const [newPositionTCircle, setNewPositionTCircle] = useState({
    x: layoutBody.width / 2 - tCircle?.width / 2,
    y: layoutBody.height / 2,
  });
  const container = document.querySelector(".display-tables-container");

  const tableWidth =
    ((container?.offsetWidth + tCircle.borderSize) * 0.95) /
    currentBlock?.maxCol;
  const tableHeigth =
    ((container?.offsetHeight + tCircle.borderSize) * 0.95) /
    currentBlock?.maxRow;

  const positionSubRow = tCircle.row < 1 ? 0 : 1;
  const positionSubCol = tCircle.col < 1 ? 0 : 1;

  console.log("tCircle.row:", tCircle.row);
  console.log("tCircle.col:", tCircle.col);
  console.log("positionSubRow:", positionSubRow);
  console.log("positionSubCol:", positionSubCol);

  const rowGap = tCircle.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = tCircle.row > 1 ? tableWidth * 0.065 : 0;

  const newRow =
    Math.round(tCircle.y / (tableHeigth + colGap)) + positionSubCol;
  const newCol = Math.round(tCircle.x / (tableWidth + rowGap)) + positionSubRow;

  // Grid Movement

  //*! ---------- Resize Observer for Width & Height -------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateTShape(tCircle._id, { width, height });

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

      setTCircles((prev) => {
        return prev.map((tCircle) => {
          if (tCircle._id === tableId) {
            return { ...response.table, row: newRow, col: newCol };
          } else {
            return tCircle;
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

    if (container && currentBlock) {
      setTCircles((prevCircles) =>
        prevCircles.map((tCr) =>
          tCr._id === tCircle._id
            ? {
                ...tCr,
                width: tableWidth,
                height: tableHeigth,
                name: tCircle.number,
                row: newRow,
                col: newCol,
                x: (tableWidth + rowsGap) * (newCol - positionSubRow),
                y: (tableHeigth + columnGap) * (newRow - positionSubCol),
              }
            : tCr
        )
      );
      // }
    }
  }, [
    currentBlock,
    tCircle._id,
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

  useEffect(() => {
    console.log("--------------------------------");
    console.log("tableWidth:", container.offsetWidth);
    console.log("tableWidth:", tableWidth);
    console.log("tableHeight:", tableHeigth);
    console.log("Y-Gap:", colGap);
    console.log("X-Gap:", rowGap);
    console.log("newRow:", newRow);
    console.log("newCol:", newCol);
    console.log("positionSubCol:", positionSubCol);
    console.log("positionSubRow:", positionSubRow);
    console.log("tCircle Object:", tCircle);
    console.log(
      "X-Position ------>",
      (tableWidth + rowGap) * (newCol - positionSubRow)
    );
    console.log(
      "Y-Position ------>",
      (tableHeigth + colGap) * (newRow - positionSubCol)
    );
    console.log("--------------------------------");
  }, [
    currentBlock,
    tCircle._id,
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

  // console.log("tCircle.height:", tCircle.height);

  // *! ------------------- DOM ----------------------------
  // *! ------------------- DOM ----------------------------
  // *! ------------------- DOM ----------------------------

  return (
    <div>
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
          container?.offsetWidth / currentBlock?.maxCol,
          container?.offsetHeight / currentBlock?.maxRow,
        ]}
      >
        <StyledTCircle
          ref={tCircleRef}
          tabIndex={1}
          onClick={() => {
            handleShowToggleForm(tCircle._id);
          }}
          // onMouseEnter={() => {
          //   setTableId(tCircle._id);
          // }}
          tCircle={tCircle}
          className="square-shape tables-shapes"
        >
          <div
            className="table-handle circle-name tables-one-shape"
            style={handleStyle}
            onDoubleClick={() => {}}
          >
            <h1>{tCircle.number}</h1>
          </div>
        </StyledTCircle>
      </Draggable>
    </div>
  );
};

export default TcircleShape;
