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
  /* border: ${(props) => props.square?.borderSize}px solid
    ${(props) => props.square?.borderColor}; */
  border-left: ${(props) =>
      props.square?.borderLeftSize ? props.square?.borderLeftSize : props.square?.borderSize}px
    solid
    ${(props) =>
      props.square?.borderLeftColor
        ? props.square?.borderLeftColor
        : props.square?.borderColor};
  border-right: ${(props) => props.square?.borderRightSize ? props.square?.borderRightSize: props.square?.borderSize}px solid
    ${(props) => props.square?.borderRightColor ? props.square?.borderRightColor: props.square?.borderColor};
  border-bottom: ${(props) => props.square?.borderBottomSize? props.square?.borderBottomSize: props.square?.borderSize}px solid
    ${(props) => props.square?.borderBottomColor ? props.square?.borderBottomColor : props.square?.borderColor};
  border-top: ${(props) => props.square?.borderTopSize? props.square?.borderTopSize: props.square?.borderSize}px solid
    ${(props) => props.square?.borderTopColor? props.square?.borderTopColor: props.square?.borderColor};
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  ${(props) => (props.resize ? "resize:both; overflow: hidden;" : "")}
  transform: translate(
    ${(props) => props.square?.x}px,
    ${(props) => props.square?.y}px
  );
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
    getShape,
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

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setHasMoved(true);
    setNewPositionSquare({ x, y });
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

  // console.log("handleClickOutside:", showShapeForm);

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  return (
    <Draggable
      bounds="parent"
      handle=".handle"
      onDrag={(e, ui) => {
        handleDrag(e, ui);
        console.log("onDrag - showShapeForm:", showShapeForm);
        console.log("onDrag - shapeId:", shapeId);
      }}
      defaultPosition={{
        x: square.x,
        y: square.y,
      }}
      onStop={() => {
        if (hasMoved) {
          handleEditShape(square._id, newPositionSquare);
          setHasMoved(false);
          console.log("onStop - showShapeForm:", showShapeForm);
          console.log("onStop - shapeId:", shapeId);
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
          className="handle"
          style={handleStyle}
          onClick={() => {
            console.log("onClick handleStyles - showShapeForm:", showShapeForm);

            console.log("onClick handleStyles - shapeId:", shapeId);
          }}
        >
          {square?.name}
        </div>

        {children}
      </StyledSquare>
    </Draggable>
  );
};

export default SquareShape;