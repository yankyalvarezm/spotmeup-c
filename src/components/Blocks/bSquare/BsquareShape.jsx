import React, { useEffect, useRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import { BlockContext } from "../../../context/block.context";
import { editBlock } from "../../../services/block.service";
import StyledbSquare from "./StyledbSquare";
import { LayoutContext } from "../../../context/layout.context";

const BsquareShape = ({ children, bSquare }) => {
  //*! -------  UseRefs ---------------

  const nameRef = useRef(null);
  const tableGridRef = useRef(null);

  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
  const {
    setBSquares,
    updateBShape,
    setShowBShapeForm,
    showBShapeForm,
    blockId,
    setBlockId,
    bShapeForm,
    currentBlock,
    setCurrentBlock,
    bSquareRef,
    bCircleRef
  } = useContext(BlockContext);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [bSquareName, setBSquareName] = useState(bSquare?.name);
  const [newPositionBSquare, setNewPositionBSquare] = useState({
    x: layoutBody.width / 2 - bSquare?.width / 2,
    y: layoutBody.height / 2,
  });

  //*! -------- Update Name -------------------
  const handleNameChange = (e) => {
    setBSquareName(e.target.value);
  };

  const saveName = async () => {
    const updated = await editBlock(bSquare._id, { name: bSquareName });
    setBSquares((currentBSquares) =>
      currentBSquares.map((b) =>
        b._id === bSquare._id ? { ...b, name: bSquareName } : b
      )
    );
    setEditingName(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  };

  //*! ---------- Resize Observer for Width & Height -------------
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateBShape(bSquare._id, { width, height });

          setBSquares((prevBSquares) => {
            return prevBSquares.map((bSq) => {
              if (bSq._id === bSquare._id) {
                return { ...bSq, width, height };
              }
              return bSq;
            });
          });
        }
      }
    });

    if (bSquareRef.current) {
      resizeObserver.observe(bSquareRef.current);
    }

    return () => {
      if (bSquareRef.current) {
        resizeObserver.unobserve(bSquareRef.current);
      }
    };
  }, []);

  //*! ------- Draggable Area Styles ---------------------------

  const handleStyle = {
    width: "100%",
    height: "80%",
    backgroundColor: bSquare?.backgroundColor,
    cursor: "grab",
    color: bSquare?.color,
    justifyContent: bSquare?.justifyContent,
    alignItems: bSquare?.alignItems,
    fontSize: `${bSquare?.fontSize}px`,
  };

  //*! ------- Edit BShape ---------------------------

  const handleEditShape = async (blockId, body) => {
    try {
      const response = await editBlock(blockId, body);
      console.log("Edited BShape:", response);
      // console.log("Line 59 - Body:", body);
      // setShapeEdited(true);
      // debugger
      setBSquares((prev) => {
        return prev.map((bSquare) => {
          if (bSquare._id === blockId) {
            return response.block;
          } else {
            return bSquare;
          }
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //*! -------- Handle Click Outside ------------------

  useEffect(() => {
    // Definir la función de manejo del clic fuera del componente
    const handleClickOutside = (event) => {
      if (
        bSquareRef.current &&
        !bSquareRef.current.contains(event.target) &&
        bShapeForm.current &&
        !bShapeForm.current.contains(event.target) &&
        !bCircleRef.current.contains(event.target)
      ) {
        setShowBShapeForm(false);
        setBlockId(null);
        setCurrentBlock(null);
        saveName();
        // console.log("Square - Clicked Outside");
      }
    };

    // Registra el event listener
    document.addEventListener("mouseup", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [bSquareRef, bShapeForm, tableGridRef]);

  //*! --------------- Show & Hide Form --------------

  const handleShowToggleForm = (bShapeId) => {
    setShowBShapeForm(true);
    setBlockId(bShapeId);
    // console.log("bShapeId:", bShapeId);
    // console.log("showBShapeForm:", showBShapeForm);
  };

  //*! -------------- On Drag Logic ----------------

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    setHasMoved(true);
    setNewPositionBSquare(newPosition);
    setBSquares((prevBSquares) =>
      prevBSquares.map((b) =>
        b._id === bSquare._id ? { ...b, x: newPosition.x, y: newPosition.y } : b
      )
    );
  };

  const layoutWidth = layoutBody.width;
  const layoutHeight = layoutBody.height;
  const bSquareWidth = bSquare?.width;
  const bSquareHeight = bSquare?.height;

  const [bounds, setBounds] = useState({});

  // *! ------------ Bounds -----------------------

  useEffect(() => {
    let newBounds = {
      left: 0,
      top: 0,
      right: layoutWidth - bSquareWidth,
      bottom: layoutHeight - bSquareHeight,
    };

    if (layoutBody.layoutType === "poligon-1") {
      // console.log("poligon-1");
      if (
        bSquare?.y >= (layoutHeight * 37) / 100 &&
        bSquare?.y <= (layoutHeight * 63) / 100 &&
        bSquare?.x >= layoutWidth * 0.79 - bSquare.width
      ) {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.37,
          right: layoutWidth * 0.98 - bSquareWidth,
          bottom: layoutHeight * 0.63 - bSquareHeight,
        };
      } else {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.02,
          right: layoutWidth * 0.79 - bSquareWidth,
          bottom: layoutHeight * 0.98 - bSquareHeight,
        };
        // console.log("poligon-1");
      }
      setBounds(newBounds);
    } else if (layoutBody.layoutType === "triangle") {
      // B = Intersection
      // Y = Vertical Axis
      // X = Horizontal Axis
      // R = R-Slope
      // L = L-Slope

      const x1 = 0.5;
      const x2 = 0.02;
      const x3 = 0.98;
      const y1 = 0.02;
      const y2 = 0.99;

      const absX1 = layoutWidth * x1;
      const absX2 = layoutWidth * x2;
      const absX3 = layoutWidth * x3;
      const absY1 = layoutHeight * y1;
      const absY2 = layoutHeight * y2;

      const lSlope = (absY2 - absY1) / (absX2 - absX1);
      const rSlope = (absY2 - absY1) / (absX3 - absX1);

      const leftLimit = (bSquare.y - absY1) / lSlope + absX1;
      const rightLimit = (bSquare.y - absY1) / rSlope + absX1;

      newBounds = {
        left: leftLimit,
        top: bSquareHeight,
        right: rightLimit - bSquareWidth,
        bottom: layoutHeight - bSquareHeight,
      };

      setBounds(newBounds);
    } else if (layoutBody.layoutType === "circle") {
      // radius = 50%

      const radius = layoutWidth / 2;

      function calculateXLimit(y) {
        const xDistance = Math.sqrt(radius ** 2 - (y - radius) ** 2);
        const leftLimit = radius - xDistance;
        const rightLimit = radius + xDistance - bSquareWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(square.y);

      console.log("layoutWidht:", layoutWidth);
      console.log("layoutHeight:", layoutHeight);
      console.log("radius:", radius);

      newBounds = {
        left: leftLimit,
        top: 0,
        right: rightLimit,
        bottom: layoutHeight - bSquareHeight,
      };

      setBounds(newBounds);
    } else if (layoutBody.layoutType === "ellipse") {
      const a = layoutWidth * 0.48;
      const b = layoutHeight * 0.24;

      function calculateXLimit(y) {
        const yRelativeToCenter = y - layoutHeight / 2;

        const xDistance = a * Math.sqrt(1 - yRelativeToCenter ** 2 / b ** 2);

        const centerX = layoutWidth / 2;
        const leftLimit = centerX - xDistance;
        const rightLimit = centerX + xDistance - bSquareWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(bSquare.y);
      newBounds = {
        left: leftLimit,
        top: a - bSquareHeight,
        right: rightLimit,
        bottom: layoutHeight - bSquareHeight,
      };
      setBounds(newBounds);
    } else if (layoutBody.layoutType === "poligon-2") {
      // console.log("squareY:", square.y);
      console.log("squareY:", bSquare.y + bSquareHeight);
      console.log("condition-2", 0.83 * layoutWidth);
      if (bSquare.y + bSquareHeight <= 0.17 * layoutHeight + bSquareHeight) {
        newBounds = {
          left: 0.17 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.83 * layoutWidth - bSquareWidth,
          bottom: 0.83 * layoutHeight - bSquareHeight,
        };

        console.log("condition - 1 checked");
      } else if (
        bSquare.x >= 0.2 * layoutWidth &&
        bSquare.x + bSquareWidth <= 0.5 * layoutWidth &&
        bSquare.y + bSquareHeight >= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.2 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.5 * layoutWidth - bSquareWidth,
          bottom: 0.98 * layoutHeight - bSquareHeight,
        };

        console.log("condition - 2 checked");
      } else if (bSquare.x < 0.18 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - bSquareWidth,
          bottom: 0.83 * layoutHeight - bSquareHeight,
        };
      } else if (
        bSquare.x + bSquareWidth >= 0.5 * layoutWidth &&
        bSquare.x + bSquareWidth <= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0,
          right: layoutWidth - bSquareWidth,
          bottom: 0.83 * layoutHeight - bSquareHeight,
        };
      } else if (bSquare.x + bSquareWidth >= 0.83 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - bSquareWidth,
          bottom: 0.83 * layoutHeight - bSquareHeight,
        };
      }
      // console.log("2%", 0.02 * layoutWidth);

      setBounds(newBounds);
    } else {
      setBounds(newBounds);
    }
  }, [
    bSquare?.x,
    bSquare?.y,
    layoutWidth,
    layoutHeight,
    bSquareWidth,
    bSquareHeight,
    layoutBody.layoutType,
  ]);

  // console.log("currentBlock:", currentBlock);

  // *! ------------- Render Add --------------------

  const renderAdd = () => {
    let tables = [];
    for (let row = 1; row <= currentBlock?.layout?.maxRow; row++) {
      for (let col = 1; col <= currentBlock?.layout?.maxCol; col++) {
        tables.push(
          <div
            key={`${row}-${col}`}
            className={
              currentBlock?.layout?._id === bSquare._id ? "grid-item" : "hide"
            }
            style={{
              backgroundColor: `${bSquare?.backgroundColor}`,
            }}
          >
            Add
          </div>
        );
      }
    }
    return tables;
  };

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <Draggable
      // bounds="parent"
      bounds={bounds}
      handle=".handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
      }}
      position={{
        x: bSquare?.x,
        y: bSquare?.y,
      }}
      onStop={(e, ui) => {
        if (hasMoved) {
          handleEditShape(bSquare._id, newPositionBSquare);
          setHasMoved(false);
        }
      }}
      grid={[5, 5]}
      // offsetParent={parent}
      // scale={1}
    >
      <StyledbSquare
        ref={bSquareRef}
        tabIndex={1}
        onClick={() => {
          handleShowToggleForm(bSquare._id);
        }}
        bSquare={bSquare}
        className="square-shape"
        resize={blockId === bSquare._id}
      >
        <div
          className="handle circle-name"
          style={handleStyle}
          onDoubleClick={() => {
            setEditingName(true);
            setTimeout(() => nameRef.current?.focus(), 0);
          }}
        >
          {editingName ? (
            <input
              ref={nameRef}
              type="text"
              value={bSquareName}
              onChange={handleNameChange}
              className="input-name-cirle"
              onKeyDown={handleKeyDown}
              style={{
                width: `${Math.max(1, bSquare.name.length) * 10}%`,
                color: bSquare.color,
                fontSize: bSquare.fontSize,
              }}
            />
          ) : (
            <>{bSquare?.name}</>
          )}
        </div>

        <div
          className={
            currentBlock?.layout?._id === bSquare._id ? "table-grid" : ""
          }
          style={{
            gridTemplateColumns: `repeat(${currentBlock?.layout?.maxCol}, 1fr)`,
            gridTemplateRows: `repeat(${currentBlock?.layout?.maxRow}, 1fr)`,
          }}
          // ref={tableGridRef}
        >
          {renderAdd()}

          {children}
        </div>
      </StyledbSquare>
    </Draggable>
  );
};

export default BsquareShape;
