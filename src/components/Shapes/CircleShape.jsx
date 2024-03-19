import React, { useEffect, useRef, useState, useContext } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { ShapeContext } from "../../context/shape.context";
import { editShapes } from "../../services/shape.service";

const StyledCircle = styled.div`
  width: ${(prop) => prop.circle?.width}px;
  height: ${(prop) => prop.circle?.width}px;
  border-radius: ${(prop) => prop.circle?.borderRadius || 50}%;
  background-color: ${(prop) => prop.circle?.backgroundColor};
  // border: ${(prop) => prop.circle?.borderSize}px solid
  //   ${(prop) => prop.circle?.borderColor};
  border-left: ${(props) =>
      props.circle?.borderLeftSize || props.circle?.borderLeftSize === 0
        ? props.circle?.borderLeftSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderLeftColor
        ? props.circle?.borderLeftColor
        : props.circle?.borderColor};
  border-right: ${(props) =>
      props.circle?.borderRightSize || props.circle?.borderRightSize === 0
        ? props.circle?.borderRightSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderRightColor
        ? props.circle?.borderRightColor
        : props.circle?.borderColor};
  border-bottom: ${(props) =>
      props.circle?.borderBottomSize || props.circle?.borderBottomSize === 0
        ? props.circle?.borderBottomSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderBottomColor
        ? props.circle?.borderBottomColor
        : props.circle?.borderColor};
  border-top: ${(props) =>
      props.circle?.borderTopSize || props.circle?.borderTopSize === 0
        ? props.circle?.borderTopSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderTopColor
        ? props.circle?.borderTopColor
        : props.circle?.borderColor};
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  text-align: center;
  transform: translate(
    ${(props) => props.circle?.x}px,
    ${(props) => props.circle?.y}px
  );
  ${(props) => (props.resize ? "resize: horizontal; overflow: hidden;" : "")}
`;

const CircleShape = ({ children, circle }) => {
  const circleRef = useRef(null);
  const nameRef = useRef(null);
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
    showShapeForm,
  } = useContext(ShapeContext);

  const [hasMoved, setHasMoved] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [circleName, setCircleName] = useState(circle.name);

  const handleNameChange = (e) => {
    setCircleName(e.target.value);
  };

  const saveName = async () => {
    const updated = await editShapes(circle._id, { name: circleName });
    setCircles((currentCircles) =>
      currentCircles.map((c) =>
        c._id === circle._id ? { ...c, name: circleName } : c
      )
    );
    setEditingName(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editingName &&
        circleRef.current &&
        !circleRef.current.contains(event.target)
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
      saveName();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveName();
    }
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
              value={circleName}
              onChange={handleNameChange}
              className="input-name-cirle"
              onKeyDown={handleKeyDown}
              style={{
                width: `${Math.max(1, circle.name.length) * 10 - 10}%`,
                color: circle.color,
                fontSize: circle.fontSize,
              }}
            />
          ) : (
            <>{circle.name}</>
          )}
        </div>
        {children}
      </StyledCircle>
    </Draggable>
  );
};

export default CircleShape;
