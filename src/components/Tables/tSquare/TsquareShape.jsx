import React, { useContext, useState, useEffect } from "react";
import { StyledTSquare } from "./StyledTSquare";
import Draggable from "react-draggable";
import { TableContext } from "../../../context/table.context";
import { editTable } from "../../../services/table.service";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";

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
  } = useContext(TableContext);
  const { currentBlock } = useContext(BlockContext);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [tSquareName, setTSquareName] = useState(tSquare?.name);
  const [newPositionTSquare, setNewPositionTSquare] = useState({
    x: layoutBody.width / 2 - tSquare?.width / 2,
    y: layoutBody.height / 2,
  });

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
    height: "80%",
    backgroundColor: tSquare?.backgroundColor,
    cursor: "grab",
    color: tSquare?.color,
    justifyContent: tSquare?.justifyContent,
    alignItems: tSquare?.alignItems,
    fontSize: `${tSquare?.fontSize}px`,
  };

  //*! ------- Edit TShape ---------------------------

  const handleEditShape = async (tableId, body) => {
    try {
      const response = await editTable(tableId, body);
      // console.log("Edited TShape:", response);
      // console.log("Line 59 - Body:", body);
      // setShapeEdited(true);
      // debugger
      setTSquares((prev) => {
        return prev.map((tSquare) => {
          if (tSquare._id === tableId) {
            return response.table;
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
        saveName();
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

  const container = document.querySelector(".display-tables-container");

  const tableWidth = (container?.offsetWidth * 0.95) / currentBlock?.maxCol;
  const tableHeigth = (container?.offsetHeight * 0.95) / currentBlock?.maxRow;
  const positionSubRow = tSquare.row < 1 ? 0 : 1;
  const positionSubCol = tSquare.col < 1 ? 0 : 1;
  const rowGap = tSquare.col > 1 ? tableWidth * 0.065 : 0;
  const colGap = tSquare.row > 1 ? tableWidth * 0.065 : 0;

  useEffect(() => {
    // console.log("adjusting");
    // console.log("tableWidth:", tableWidth);

    // debugger
    if (container && currentBlock) {
      // debugger

      // if (tableId === tSquare._id) {
      // debugger
      setTSquares((prevSquares) =>
        prevSquares.map((tSqr) =>
          tSqr._id === tSquare._id
            ? {
                ...tSqr,
                width: tableWidth,
                height: tableHeigth,
                x: (tableWidth + rowGap) * (tSquare.col - positionSubRow),
                y: (tableHeigth + colGap) * (tSquare.row - positionSubCol),
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

  // console.log("tSquare:", tSquare);

  return (
    <Draggable
      bounds="parent"
      // bounds={bounds}
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
      grid={[tSquare.width, tSquare.height]}
    >
      <StyledTSquare
        ref={tSquareRef}
        tabIndex={1}
        onClick={() => {
          handleShowToggleForm(tSquare._id);
        }}
        tSquare={tSquare}
        className="square-shape tables-shapes"
        // maxRow={currentBlock && currentBlock.maxRow}
        // maxCol={currentBlock && currentBlock.maxCol}
        // resize={tableId === tSquare._id}
      >
        <div
          className="table-handle circle-name tables-one-shape"
          style={handleStyle}
          onDoubleClick={() => {
            setEditingName(true);
            // setTimeout(() => nameRef.current?.focus(), 0);
          }}
        >
          {/* {editingName ? (
            <input
              ref={nameRef}
              type="text"
              value={tSquareName}
              // onChange={handleNameChange}
              className="input-name-cirle"
              onKeyDown={handleKeyDown}
              style={{
                // width: `${Math.max(1, tSquare.name.length) * 10}%`,
                color: tSquare.color,
                fontSize: tSquare.fontSize,
              }}
            />
          ) : (
          )} */}
          <>{tSquare.name}</>
        </div>
      </StyledTSquare>
    </Draggable>
  );
};

export default TsquareShape;
