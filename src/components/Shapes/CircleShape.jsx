import React, { useEffect, useRef, useState, useContext } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { ShapeContext } from "../../context/shape.context";
import { editShapes } from "../../services/shape.service";

const StyledCircle = styled.div`
  width: ${({ width }) => (width ? width : "100")}px;
  height: ${({ height }) => (height ? height : "100")}px;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "50")}%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#000"};
  border: ${({ borderSize }) => (borderSize ? borderSize : 3)}px solid black;
  resize: both;
  overflow: hidden;
  position: absolute;
`;

const CircleShape = ({ children, circle }) => {
  const circleRef = useRef(null);
  const [newPositionCircle, setNewPositionCircle] = useState({
    x: 0,
    y: 0,
  });

  const {
    toggleShapeForm,
    shapeForm,
    setShapeId,
    setShowShapeForm,
    setCircles,
    shapeId
  } = useContext(ShapeContext);

  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // console.log(`Circle Width: ${width}px, Circle Height: ${height}px`);
      }
    });

    if (circleRef.current) {
      resizeObserver.observe(circleRef.current);
    }

    return () => {
      if (circleRef.current) {
        resizeObserver.unobserve(circleRef.current);
      }
    };
  }, []);

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
    setNewPositionCircle({ x, y });
    // console.log(newPosition);
  };

  const handleEditShape = async (shapeId, body) => {
    try {
      const response = await editShapes(shapeId, body);
      console.log("Edited Shape", response);
      console.log("Line 59 - Body:", body);
      setCircles((prev) => {
        return prev.map((circle) => {
          if (circle._id === shapeId) {
            return response.shape;
          } else {
            return circle;
          }
        });
      });
      // setShapeEdited(true)
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log("shapeId", shapeId);

  const handleClickOutside = (e) => {
    if (
      circleRef.current &&
      !circleRef.current.contains(e.target) &&
      shapeForm.current &&
      !shapeForm.current.contains(e.target)
    ) {
      setShowShapeForm(false);
      setShapeId(null);
      console.log("shapeId:", shapeId);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
    console.log("shapeId:", shapeId);
  };

  return (
    <Draggable
      bounds="parent"
      handle=".handle"
      onDrag={(e, ui) => handleDrag(e, ui)}
      defaultPosition={{ x: circle.x, y: circle.y }}
      onStop={() => {
        if (hasMoved) {
          handleEditShape(circle._id, newPositionCircle);
          setHasMoved(false);
        }
      }}
    >
      <StyledCircle
        ref={circleRef}
        onClick={() => handleShowToggleForm(circle._id)}
        tabIndex={0}
        onFocus={toggleShapeForm}
      >
        <div className="handle circle-name" style={handleStyle}>
          {circle.name}
        </div>
        {children}
      </StyledCircle>
    </Draggable>
  );
};

export default CircleShape;
