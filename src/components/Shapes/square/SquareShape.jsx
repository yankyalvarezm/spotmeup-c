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
  const { layoutBody } = useContext(LayoutContext);
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

  function getPolygonPoints(
    layoutType,
    containerWidth,
    containerHeight,
    squareWidth,
    squareHeight
  ) {
    switch (layoutType) {
      case "poligon-1":
        return [
          {
            x: containerWidth * 0.79 - square.width,
            y: containerHeight * 0.02,
          },
          {
            x: containerWidth * 0.79 - square.width,
            y: containerHeight * 0.37,
          },
          {
            x: containerWidth * 0.98 - square.width,
            y: containerHeight * 0.37,
          },
          {
            x: containerWidth * 0.98 - square.width,
            y: containerHeight * 0.63 - square.height,
          },
          {
            x: containerWidth * 0.79 - square.width,
            y: containerHeight * 0.63 - square.height,
          },
          {
            x: containerWidth * 0.79 - square.width,
            y: containerHeight * 0.88,
          },
          {
            x: containerWidth * 0.02 - square.width,
            y: containerHeight * 0.98,
          },
          {
            x: containerWidth * 0.02 - square.width,
            y: containerHeight * 0.02,
          },
        ];
      case "triangle":
        return [
          {
            x: containerWidth * 0.5 - square.width,
            y: containerHeight * 0.02,
          },
          {
            x: containerWidth * 0.02 - square.width,
            y: containerHeight * 0.99 + square.height,
          },
          {
            x: containerWidth * 0.98 - square.width,
            y: containerHeight * 0.99,
          },
        ];
      case "poligon-2":
        return [
          {
            x: containerWidth * 0.26 - square.width / 3,
            y: containerHeight * 0.02 - square.height / 3,
          },
          {
            x: containerWidth * 0.74 - square.width / 3,
            y: containerHeight * 0.02 - square.height / 3,
          },
          {
            x: containerWidth * 0.98 - square.width / 3,
            y: containerHeight * 0.5 - square.height / 3,
          },
          {
            x: containerWidth * 0.74 - square.width / 3,
            y: containerHeight * 0.98 - square.height / 3,
          },
          {
            x: containerWidth * 0.26 - square.width / 3,
            y: containerHeight * 0.98 - square.height / 3,
          },
          {
            x: containerWidth * 0.02 - square.width / 3,
            y: containerHeight * 0.5 - square.height / 3,
          },
        ];

      default:
        return [
          {
            x: 0,
            y: 0,
          },
          {
            x: containerWidth,
            y: 0,
          },
          {
            x: containerWidth,
            y: containerHeight,
          },
          {
            x: 0,
            y: containerHeight,
          },
        ];
    }
  }

  let polygonPoints = getPolygonPoints(
    layoutBody.layoutType,
    layoutBody.width,
    layoutBody.height,
    square.width,
    square.height
  );

  function isPointInPolygon(polygon, point) {
    let isInside = false;
    const x = point.x,
      y = point.y;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x,
        yi = polygon[i].y;
      const xj = polygon[j].x,
        yj = polygon[j].y;

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) isInside = !isInside;
    }
    return isInside;
  }

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };
    // console.log(`Polygon points for ${layoutBody.layoutType}:`, polygonPoints);

    if (isPointInPolygon(polygonPoints, newPosition)) {
      // console.log("INSIDE");
      setHasMoved(true);
      setLastValidPosition(newPosition);
      setNewPositionSquare(newPosition);
      setSquares(prevSquares =>
        prevSquares.map(s =>
          s._id === square._id ? { ...s, x: newPosition.x, y: newPosition.y } : s
        )
      );
    } else {
      // console.log("OUTSIDE");

      const dx = newPosition.x - lastValidPosition.x;
      const dy = newPosition.y - lastValidPosition.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        // console.log("X - OUT");

        setNewPositionSquare({
          x: lastValidPosition.x,
          y: newPosition.y,
        });
        setSquares(prevSquares =>
          prevSquares.map(s =>
            s._id === square._id ? { ...s, x: lastValidPosition.x, y: newPosition.y } : s
          )
        );
        
      } else if (Math.abs(dy) > Math.abs(dx)) {
        // console.log("Y - OUT");

        setNewPositionSquare({
          x: newPosition.x,
          y: lastValidPosition.y,
        });
        setSquares(prevSquares =>
          prevSquares.map(s =>
            s._id === square._id ? { ...s, x: newPosition.x, y: lastValidPosition.y } : s
          )
        );
      } else {
        // console.log("same shit");
        setNewPositionSquare(lastValidPosition);
        setSquares(prevSquares =>
          prevSquares.map(s =>
            s._id === square._id ? { ...s, x: lastValidPosition.x, y: lastValidPosition.y } : s
          )
        );
      }
    }
  };

  return (
    <Draggable
      bounds="parent"
      handle=".handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
      }}
      position={{
        x: square.x,
        y: square.y,
      }}
      onStop={(e, ui) => {
        // const newPosition = { x: ui.x, y: ui.y };
        if (hasMoved) {
          
          handleEditShape(square._id, newPositionSquare);
          setHasMoved(false);
        }
      }}
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
