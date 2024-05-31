import React, { useEffect, useRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import { ShapeContext } from "../../../context/shape.context";
import { editShapes } from "../../../services/shape.service";
import { StyledSquare } from "./StyledSquare";
import { LayoutContext } from "../../../context/layout.context";

const SquareShape = ({ children, square }) => {
  const squareRef = useRef(null);
  const nameRef = useRef(null);
  const { layoutBody, floorplan, layoutDetails, layoutRef } =
    useContext(LayoutContext);
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
        const { height } = entry.contentRect;

        const width = entry.contentRect.width;

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

  const handleEditShape = async (shapeId, body) => {
    try {
      const response = await editShapes(shapeId, body);
      // console.log("Edited Shape:", response);
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

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    setHasMoved(true);
    setNewPositionSquare(newPosition);
    setSquares((prevSquares) =>
      prevSquares.map((s) =>
        s._id === square._id ? { ...s, x: newPosition.x, y: newPosition.y } : s
      )
    );
  };

  // console.log("containerScale:",  layoutDetails?.containerScale);
  // console.log("squareWidth:",  square.width);

  const autoWidth = layoutDetails?.containerScale * square?.width;
  // console.log("🚀 ~ SquareShape ~ autoWidth:", autoWidth)

  return (
    <Draggable
      bounds={layoutRef}
      // bounds={bounds}
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
      // grid={[5, 5]}
      scale={layoutDetails?.displayScale}
      // offsetParent={layoutRef}
      // offsetParent={parent}
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
        dinamicWidth={autoWidth}
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
