import React, { useEffect, useRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { ShapeContext } from "../../context/shape.context";
import { shapes } from "konva/lib/Shape";
import { editShapes } from "../../services/shape.service";

const StyledSquare = styled.div`
  position: absolute;
  width: ${(props) => props.square?.width}px;
  height: ${(props) => props.square?.height}px;
  background-color: ${(props) => props.square?.backgroundColor};
  border: ${(props) => props.square?.borderSize}px solid black;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  resize: both;
  overflow: hidden;
`;

const SquareShape = ({ children, square }) => {
  const squareRef = useRef(null);
  const [newPositionSquare, setNewPositionSquare] = useState({
    x: 0,
    y: 0,
  });
  const {
    showInput,
    setShowInput,
    toggleShapeForm,
    shapeForm,
    setShapeId,
    showShapeForm,
    shapeId,
    setShowShapeForm,
    setShapeEdited,
    squares,
    setSquares,
  } = useContext(ShapeContext);
  const [hasMoved, setHasMoved] = useState(false);

  const handleShowInput = () => {
    setShowInput((prev) => !prev);
    console.log("double click");
  };

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const updateShape = debounce((shapeId, body) => {
    editShapes(shapeId, body);
    console.log("debounce working");
  }, 250);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        if (width || height) {
          updateShape(square._id, { width, height });
        }

        setSquares((prevSquares) => {
          return prevSquares.map((sq) => {
            if (sq._id === square._id) {
              // Actualiza solo el square que ha sido redimensionado
              return { ...sq, width, height };
            }
            return sq; // Retorna los que no han cambiado
          });
        });
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
  }, [square._id]);

  const handleStyle = {
    width: "100%",
    height: "80%",
    backgroundColor: "black",
    cursor: "grab",
  };

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    const newPosition = { x, y };
    setHasMoved(true);
    setNewPositionSquare({ x, y });
    // console.log(newPosition);
  };

  const handleEditShape = async (shapeId, body) => {
    try {
      const response = await editShapes(shapeId, body);
      console.log("Edited Shape:", response);
      console.log("Line 59 - Body:", body);
      // setShapeEdited(true);
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

  // console.log("shapeId", shapeId);

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
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Draggable
      bounds="parent"
      handle=".handle"
      onDrag={(e, ui) => handleDrag(e, ui)}
      defaultPosition={{
        x: square.x,
        y: square.y,
      }}
      onStop={() => {
        if (hasMoved) {
          handleEditShape(square._id, newPositionSquare);
          setHasMoved(false);
        }
      }}
    >
      <StyledSquare
        ref={squareRef}
        onDoubleClick={handleShowInput}
        tabIndex={1}
        onClick={() => {
          handleShowToggleForm(square._id);
          console.log(square);
        }}
        square={square}
      >
        <div className="handle" style={handleStyle}></div>

        {children}
      </StyledSquare>
    </Draggable>
  );
};

export default SquareShape;
