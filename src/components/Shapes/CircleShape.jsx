import React, { useEffect, useRef, useState, useContext } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { ShapeContext } from "../../context/shape.context";
import { editShapes } from "../../services/shape.service";

const StyledCircle = styled.div`
  width: ${(prop) => prop.circle?.width}px;
  height: ${(prop) => prop.circle?.height}px;
  border-radius: ${(prop) => prop.circle?.borderRadius || 50}%;
  background-color: ${(prop) => prop.circle?.backgroundColor};
  border: ${(prop) => prop.circle?.borderSize}px solid black;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  text-align: center;
  transform: translate(
    ${(props) => props.circle?.x}px,
    ${(props) => props.circle?.y}px
  );
  ${(props) => (props.resize ? "resize:both; overflow: hidden;" : "")}
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
    shapeId,
    getShape,
    showShapeForm
  } = useContext(ShapeContext);

  const [hasMoved, setHasMoved] = useState(false);

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
        const { width, height } = entry.contentRect;

        if (width && height) {
          updateShape(circle._id, { width, height });

          setCircles((prevCircles) => {
            return prevCircles.map((cr) => {
              if (cr._id === circle._id) {
                return { ...cr, width, height };
              }
              return cr;
            });
          });
        }
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
    width: circle.width,
    height: circle.height,
    backgroundColor: circle.backgroundColor,
    cursor: "grab",
    color: circle.color,
    justifyContent: circle.justifyContent,
    alignItems: circle.alignItems,
    borderRadius: "50%",
  };

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setHasMoved(true);
    setNewPositionCircle({ x, y });
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
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
    getShape();
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
        circle={circle}
        className="circle-shape"
        resize={showShapeForm}
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
