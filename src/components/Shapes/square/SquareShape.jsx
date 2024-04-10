import React, { useEffect, useRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import { ShapeContext } from "../../../context/shape.context";
import { shapes } from "konva/lib/Shape";
import { editShapes } from "../../../services/shape.service";
import { StyledSquare } from "./StyledSquare";
import { LayoutContext } from "../../../context/layout.context";

const SquareShape = ({ children, square }) => {
  const squareRef = useRef(null);
  const nameRef = useRef(null);
  const { layoutBody, floorplan } = useContext(LayoutContext);
  const {
    shapeForm,
    setShapeId,
    showShapeForm,
    shapeId,
    setShowShapeForm,
    setSquares,
    updateShape,
  } = useContext(ShapeContext);
  const [hasMoved, setHasMoved] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [squareName, setSquareName] = useState(square.name);
  const [lastValidPosition, setLastValidPosition] = useState({ x: 0, y: 0 });
  const [newPositionSquare, setNewPositionSquare] = useState({
    x: layoutBody.width / 2 - square.width / 2,
    y: layoutBody.width / 2,
  });

  const handleNameChange = (e) => {
    setSquareName(e.target.value);
  };

  const saveName = async () => {
    const updated = await editShapes(square._id, { name: squareName });
    setSquares((currentSquares) =>
      currentSquares.map((s) =>
        s._id === square._id ? { ...s, name: squareName } : s
      )
    );
    setEditingName(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editingName &&
        squareRef.current &&
        !squareRef.current.contains(event.target)
      ) {
        saveName();
        setEditingName(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingName, saveName]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width && height) {
          updateShape(square._id, { width, height });

          setSquares((prevSquares) => {
            return prevSquares.map((sq) => {
              if (sq._id === square._id) {
                return { ...sq, width, height };
              }
              return sq;
            });
          });
        }
      }
    });

    if (squareRef.current) {
      resizeObserver.observe(squareRef.current);
    }

    return () => {
      if (squareRef.current) {
        resizeObserver.unobserve(squareRef.current);
      }
    };
  }, []);

  const handleStyle = {
    width: "100%",
    height: "80%",
    backgroundColor: square.backgroundColor,
    cursor: "grab",
    color: square.color,
    justifyContent: square.justifyContent,
    alignItems: square.alignItems,
    fontSize: `${square.fontSize}px`,
  };

  // console.log("squareX:", newPositionSquare.x)
  // console.log("squareY:", newPositionSquare.y)

  const handleEditShape = async (shapeId, body) => {
    try {
      const response = await editShapes(shapeId, body);
      console.log("Edited Shape:", response);
      // console.log("Line 59 - Body:", body);
      // setShapeEdited(true);
      // debugger
      setSquares((prev) => {
        return prev.map((square) => {
          if (square._id === shapeId) {
            return response.shape;
          } else {
            return square;
          }
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickOutside = (e) => {
    if (
      squareRef.current &&
      !squareRef.current.contains(e.target) &&
      shapeForm.current &&
      !shapeForm.current.contains(e.target)
    ) {
      setShowShapeForm(false);

      setShapeId(null);
    }
  };

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  };

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    setHasMoved(true)
    setNewPositionSquare(newPosition);
    setSquares((prevSquares) =>
      prevSquares.map((s) =>
        s._id === square._id ? { ...s, x: newPosition.x, y: newPosition.y } : s
      )
    );
  };

  const layoutWidth = layoutBody.width;
  const layoutHeight = layoutBody.height;
  const squareWidth = square.width;
  const squareHeight = square.height;

  const [bounds, setBounds] = useState({});

  useEffect(() => {
    let newBounds = {
      left: 0,
      top: 0,
      right: layoutWidth - squareWidth,
      bottom: layoutHeight - squareHeight,
    };

    if (layoutBody.layoutType === "poligon-1") {
      // console.log("poligon-1");
      if (
        square.y >= (layoutHeight * 37) / 100 &&
        square.y <= (layoutHeight * 63) / 100 &&
        square.x >= layoutWidth * 0.79 - square.width
      ) {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.37,
          right: layoutWidth * 0.98 - squareWidth,
          bottom: layoutHeight * 0.63 - squareHeight,
        };
      } else {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.02,
          right: layoutWidth * 0.79 - squareWidth,
          bottom: layoutHeight * 0.98 - squareHeight,
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

      const leftLimit = (square.y - absY1) / lSlope + absX1;
      const rightLimit = (square.y - absY1) / rSlope + absX1;

      newBounds = {
        left: leftLimit,
        top: squareHeight,
        right: rightLimit - squareWidth,
        bottom: layoutHeight - squareHeight,
      };

      setBounds(newBounds);
    } else if (layoutBody.layoutType === "circle") {
      // radius = 50%

      const radius = layoutWidth / 2;

      function calculateXLimit(y) {
        const xDistance = Math.sqrt(radius ** 2 - (y - radius) ** 2);
        const leftLimit = radius - xDistance;
        const rightLimit = radius + xDistance - squareWidth;

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
        bottom: layoutHeight - squareHeight,
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
        const rightLimit = centerX + xDistance - squareWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(square.y);
      newBounds = {
        left: leftLimit,
        top: a - squareHeight,
        right: rightLimit,
        bottom: layoutHeight - squareHeight,
      };
      setBounds(newBounds);
    } else if (layoutBody.layoutType === "poligon-2") {
      // console.log("squareY:", square.y);
      console.log("squareY:", square.y + squareHeight);
      console.log("condition-2", 0.83 * layoutWidth);
      if (square.y + squareHeight <= 0.17 * layoutHeight + squareHeight) {
        newBounds = {
          left: 0.17 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.83 * layoutWidth - squareWidth,
          bottom: 0.83 * layoutHeight - squareHeight,
        };

        console.log("condition - 1 checked");
      } else if (
        square.x >= 0.2 * layoutWidth &&
        square.x + squareWidth <= 0.5 * layoutWidth &&
        square.y + squareHeight >= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.2 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.5 * layoutWidth - squareWidth,
          bottom: 0.98 * layoutHeight - squareHeight,
        };

        console.log("condition - 2 checked");
      } else if (square.x < 0.18 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - squareWidth,
          bottom: 0.83 * layoutHeight - squareHeight,
        };
      } else if (
        square.x + squareWidth >= 0.5 * layoutWidth &&
        square.x + squareWidth <= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0,
          right: layoutWidth - squareWidth,
          bottom: 0.83 * layoutHeight - squareHeight,
        };
      } else if (square.x + squareWidth >= 0.83 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - squareWidth,
          bottom: 0.83 * layoutHeight - squareHeight,
        };
      }
      // console.log("2%", 0.02 * layoutWidth);

      setBounds(newBounds);
    } else {
      setBounds(newBounds);
    }
  }, [
    square.x,
    square.y,
    layoutWidth,
    layoutHeight,
    squareWidth,
    squareHeight,
    layoutBody.layoutType,
  ]);

  // console.log("Bounds:", bounds);
  // console.log("floorplan:", layoutBody.layoutType);

  return (
    <Draggable
      // bounds="parent"
      bounds={bounds}
      handle=".handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
      }}
      position={{
        x: square.x,
        y: square.y,
      }}
      onStop={(e, ui) => {
        if (hasMoved) {
          handleEditShape(square._id, newPositionSquare);
          setHasMoved(false);
        }
      }}
      grid={[5, 5]}
      // offsetParent={parent}
      // scale={1}
    >
      <StyledSquare
        ref={squareRef}
        tabIndex={1}
        onClick={() => {
          handleShowToggleForm(square._id);
        }}
        square={square}
        className="square-shape"
        resize={showShapeForm}
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
              value={squareName}
              onChange={handleNameChange}
              className="input-name-cirle"
              onKeyDown={handleKeyDown}
              style={{
                width: `${Math.max(1, square.name.length) * 10}%`,
                color: square.color,
                fontSize: square.fontSize,
              }}
            />
          ) : (
            <>{square.name}</>
          )}
        </div>

        {children}
      </StyledSquare>
    </Draggable>
  );
};

export default SquareShape;
