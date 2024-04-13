import React, { useEffect, useRef, useState, useContext } from "react";
import Draggable from "react-draggable";
import { ShapeContext } from "../../../context/shape.context";
import { editShapes } from "../../../services/shape.service";
import { StyledCircle } from "./StyledCircle";
import { LayoutContext } from "../../../context/layout.context";

const CircleShape = ({ children, circle }) => {
  //*! -------  UseRefs --------------
  const circleRef = useRef(null);
  const nameRef = useRef(null);

  //*! -------  Contexts --------------
  // ? -- BlockContext ----------------
  const {
    toggleShapeForm,
    shapeForm,
    setShapeId,
    setShowShapeForm,
    setCircles,
    shapeId,
    showShapeForm,
    updateShape,
  } = useContext(ShapeContext);

  // ? -- LayoutContext ---------------
  const { layoutBody } = useContext(LayoutContext);

  //*! -------  Local States --------------
  const [hasMoved, setHasMoved] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [circleName, setCircleName] = useState(circle.name);
  const [newPositionCircle, setNewPositionCircle] = useState({
    x: layoutBody.width / 2 - circle.width / 2,
    y: layoutBody.width / 2,
  });

  //*! -------- Update Name -------------------
  const handleNameChange = (e) => {
    setCircleName(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveName();
    }
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

  //*! ---------- Resize Observer for Width & Height -------------
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

  //*! ------- Draggable Area Styles ---------------------------

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

  //*! ------- Edit Shape ---------------------------

  const handleEditShape = async (shapeId, body) => {
    try {
      const response = await editShapes(shapeId, body);
      // console.log("Edited Shape", response);
      // console.log("Line 59 - Body:", body);
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

  //*! -------- Handle Click Outside ------------------

  const handleClickOutside = (e) => {
    if (
      circleRef.current &&
      !circleRef.current.contains(e.target) &&
      shapeForm.current &&
      !shapeForm.current.contains(e.target)
    ) {
      setShowShapeForm(false);
      setShapeId(null);
      // console.log("shapeId:", shapeId);
      saveName();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

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

  //*! --------------- Show & Hide Form --------------

  const handleShowToggleForm = (shapeId) => {
    setShowShapeForm(true);
    setShapeId(shapeId);
  };

  //*! -------------- On Drag Logic ----------------

  const handleDrag = (e, ui) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };
    // console.log(`Polygon points for ${layoutBody.layoutType}:`, polygonPoints);
    setNewPositionCircle(newPosition);
    setHasMoved(true);

    setCircles((prevCircles) =>
      prevCircles.map((c) =>
        c._id === circle._id ? { ...c, x: newPosition.x, y: newPosition.y } : c
      )
    );
  };

  // *! ------------ Bounds -----------------------

  const layoutWidth = layoutBody.width;
  const layoutHeight = layoutBody.height;
  const circleWidth = circle.width;
  const circleHeight = circle.height;

  const [bounds, setBounds] = useState({});

  useEffect(() => {
    let newBounds = {
      left: 0,
      top: 0,
      right: layoutWidth - circleWidth,
      bottom: layoutHeight - circleHeight,
    };

    if (layoutBody.layoutType === "poligon-1") {
      // console.log("poligon-1");
      if (
        circle.y >= (layoutHeight * 37) / 100 &&
        circle.y <= (layoutHeight * 63) / 100 &&
        circle.x >= layoutWidth * 0.79 - circle.width
      ) {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.37,
          right: layoutWidth * 0.98 - circleWidth,
          bottom: layoutHeight * 0.63 - circleHeight,
        };
      } else {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.02,
          right: layoutWidth * 0.79 - circleWidth,
          bottom: layoutHeight * 0.98 - circleHeight,
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

      // console.log("triangle");

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

      const leftLimit = (circle.y - absY1) / lSlope + absX1;
      const rightLimit = (circle.y - absY1) / rSlope + absX1;

      newBounds = {
        left: leftLimit - circleWidth / 4.5,
        top: circleHeight / 1.35,
        right: rightLimit - circleWidth / 1.25,
        bottom: layoutHeight - circleHeight,
      };

      setBounds(newBounds);
    } else if (layoutBody.layoutType === "circle") {
      // radius = 50%
      // console.log("circle");
      const radius = layoutWidth / 2;

      function calculateXLimit(y) {
        const xDistance = Math.sqrt(radius ** 2 - (y - radius) ** 2);
        const leftLimit = radius - xDistance;
        const rightLimit = radius + xDistance - circleWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(circle.y);

      // console.log("layoutWidht:", layoutWidth);
      // console.log("layoutHeight:", layoutHeight);
      // console.log("radius:", radius);

      newBounds = {
        left: leftLimit,
        top: 0,
        right: rightLimit,
        bottom: layoutHeight - circleHeight,
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
        const rightLimit = centerX + xDistance - circleWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(circle.y);
      newBounds = {
        left: leftLimit,
        top: a - circleHeight,
        right: rightLimit,
        bottom: layoutHeight - circleHeight,
      };
      setBounds(newBounds);
    } else if (layoutBody.layoutType === "poligon-2") {
      if (circle.y + circleHeight <= 0.17 * layoutHeight + circleHeight) {
        newBounds = {
          left: 0.17 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.83 * layoutWidth - circleWidth,
          bottom: 0.83 * layoutHeight - circleHeight,
        };

        // console.log("condition - 1 checked");
      } else if (
        circle.x >= 0.2 * layoutWidth &&
        circle.x + circleWidth <= 0.5 * layoutWidth &&
        circle.y + circleHeight >= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.2 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.5 * layoutWidth - circleWidth,
          bottom: 0.98 * layoutHeight - circleHeight,
        };

        // console.log("condition - 2 checked");
      } else if (circle.x < 0.18 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - circleWidth,
          bottom: 0.83 * layoutHeight - circleHeight,
        };
      } else if (
        circle.x + circleWidth >= 0.5 * layoutWidth &&
        circle.x + circleWidth <= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0,
          right: layoutWidth - circleWidth,
          bottom: 0.83 * layoutHeight - circleHeight,
        };
      } else if (circle.x + circleWidth >= 0.83 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - circleWidth,
          bottom: 0.83 * layoutHeight - circleHeight,
        };
      }

      setBounds(newBounds);
    } else {
      setBounds(newBounds);
    }
  }, [
    circle.x,
    circle.y,
    layoutWidth,
    layoutHeight,
    circleWidth,
    circleHeight,
    layoutBody.layoutType,
  ]);

  // console.log("circle.x:", circle.x);
  // console.log("circle.y:", circle.y);

  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------
  // *! -------- DOM ELEMENTS -----------------------

  return (
    <Draggable
      // bounds="parent"
      bounds={bounds}
      handle=".handle"
      onDrag={(e, ui) => handleDrag(e, ui)}
      // position={{ x: newPositionCircle.x, y: newPositionCircle.y }}
      position={{ x: circle.x, y: circle.y }}
      onStop={() => {
        if (hasMoved) {
          handleEditShape(circle._id, newPositionCircle);
          setHasMoved(false);
        }
      }}
      // grid={[5, 5]}
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
