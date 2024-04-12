import { useRef, useContext, useState, useEffect } from "react";
import Draggable from "react-draggable";
import StyledbCircle from "./StyledbCircle";
import { LayoutContext } from "../../../context/layout.context";
import { BlockContext } from "../../../context/block.context";
import { editBlock } from "../../../services/block.service";

const BcircleShape = ({ children, bCircle }) => {
  const bCircleRef = useRef(null);
  const nameRef = useRef(null);

  const { setBCircles, updateBShape } = useContext(BlockContext);
  const { layoutBody } = useContext(LayoutContext);

  const [hasMoved, setHasMoved] = useState(false);
  const [editingBName, setEditingBName] = useState(false);
  const [bCircleName, setBCircleName] = useState(bCircle.name);

  const [newPositionBCircle, setNewPositionBCircle] = useState({
    x: layoutBody.width / 2 - bCircle.width / 2,
    y: layoutBody.width / 2,
  });

  const handleNameChange = (e) => {
    setBCircleName(e.target.value);
  };

  const saveName = async () => {
    await editBlock(bCircle._id, { name: bCircleName });
    setBCircles((currentBCircles) =>
      currentBCircles.map((bC) =>
        bC._id === bCircle._id ? { ...bC, name: bCircleName } : c
      )
    );
    setEditingBName(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editingBName &&
        bCircleRef.current &&
        !bCircleRef.current.contains(event.target)
      ) {
        saveName();
        setEditingBName(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingBName, saveName]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        if (width && height) {
          updateBShape(bCircle._id, { width, height });

          setBCircles((prevBCircles) => {
            return prevBCircles.map((bC) => {
              if (bC._id === bCircle._id) {
                return { ...bC, width, height };
              }
              return bC;
            });
          });
        }
      }
    });

    if (bCircleRef.current) {
      resizeObserver.observe(bCircleRef.current);
    }

    return () => {
      if (bCircleRef.current) {
        resizeObserver.unobserve(bCircleRef.current);
      }
    };
  }, []);

  const handleStyle = {
    width: bCircle.width,
    height: bCircle.height,
    backgroundColor: bCircle.backgroundColor,
    cursor: "grab",
    color: bCircle.color,
    justifyContent: bCircle.justifyContent,
    alignItems: bCircle.alignItems,
    borderRadius: "50%",
  };

  const handleEditBShape = async (bShapeId, body) => {
    try {
      const response = await editBlock(bShapeId, body);
      console.log("Edited Shape", response);
      // console.log("Line 59 - Body:", body);
      setBCircles((prev) => {
        return prev.map((bCircle) => {
          if (bCircle._id === bShapeId) {
            return response.block;
          } else {
            return bCircle;
          }
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  const handleClickOutside = (e) => {
    if (
      bCircleRef.current &&
      !bCircleRef.current.contains(e.target)
      // && shapeForm.current && !shapeForm.current.contains(e.target)
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
  // const handleShowToggleForm = (bShapeId) => {
  //   setShowShapeForm(true);
  //   setShapeId(bShapeId);
  // };

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
    // console.log(`Polygon points for ${layoutBody.layoutType}:`, polygonPoints);
    setNewPositionBCircle(newPosition);
    setHasMoved(true);

    setBCircles((prevCircles) =>
      prevCircles.map((bC) =>
        bC._id === bCircle._id
          ? { ...bC, x: newPosition.x, y: newPosition.y }
          : bC
      )
    );
  };

  const layoutWidth = layoutBody.width;
  const layoutHeight = layoutBody.height;
  const bCircleWidth = bCircle.width;
  const bCircleHeight = bCircle.height;

  const [bounds, setBounds] = useState({});

  useEffect(() => {
    let newBounds = {
      left: 0,
      top: 0,
      right: layoutWidth - bCircleWidth,
      bottom: layoutHeight - bCircleHeight,
    };

    if (layoutBody.layoutType === "poligon-1") {
      // console.log("poligon-1");
      if (
        bCircle.y >= (layoutHeight * 37) / 100 &&
        bCircle.y <= (layoutHeight * 63) / 100 &&
        bCircle.x >= layoutWidth * 0.79 - bCircle.width
      ) {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.37,
          right: layoutWidth * 0.98 - bCircleWidth,
          bottom: layoutHeight * 0.63 - bCircleHeight,
        };
      } else {
        newBounds = {
          left: layoutWidth * 0.02,
          top: layoutHeight * 0.02,
          right: layoutWidth * 0.79 - bCircleWidth,
          bottom: layoutHeight * 0.98 - bCircleHeight,
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

      const leftLimit = (bCircle.y - absY1) / lSlope + absX1;
      const rightLimit = (bCircle.y - absY1) / rSlope + absX1;

      newBounds = {
        left: leftLimit - bCircleWidth / 4.5,
        top: bCircleHeight / 1.35,
        right: rightLimit - bCircleWidth / 1.25,
        bottom: layoutHeight - bCircleHeight,
      };

      setBounds(newBounds);
    } else if (layoutBody.layoutType === "circle") {
      // radius = 50%
      // console.log("circle");
      const radius = layoutWidth / 2;

      function calculateXLimit(y) {
        const xDistance = Math.sqrt(radius ** 2 - (y - radius) ** 2);
        const leftLimit = radius - xDistance;
        const rightLimit = radius + xDistance - bCircleWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(bCircle.y);

      // console.log("layoutWidht:", layoutWidth);
      // console.log("layoutHeight:", layoutHeight);
      // console.log("radius:", radius);

      newBounds = {
        left: leftLimit,
        top: 0,
        right: rightLimit,
        bottom: layoutHeight - bCircleHeight,
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
        const rightLimit = centerX + xDistance - bCircleWidth;

        return { leftLimit, rightLimit };
      }

      let { leftLimit, rightLimit } = calculateXLimit(bCircle.y);
      newBounds = {
        left: leftLimit,
        top: a - bCircleHeight,
        right: rightLimit,
        bottom: layoutHeight - bCircleHeight,
      };
      setBounds(newBounds);
    } else if (layoutBody.layoutType === "poligon-2") {
      if (bCircle.y + bCircleHeight <= 0.17 * layoutHeight + bCircleHeight) {
        newBounds = {
          left: 0.17 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.83 * layoutWidth - bCircleWidth,
          bottom: 0.83 * layoutHeight - bCircleHeight,
        };

        // console.log("condition - 1 checked");
      } else if (
        bCircle.x >= 0.2 * layoutWidth &&
        bCircle.x + bCircleWidth <= 0.5 * layoutWidth &&
        bCircle.y + bCircleHeight >= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.2 * layoutWidth,
          top: 0.02 * layoutHeight,
          right: 0.5 * layoutWidth - bCircleWidth,
          bottom: 0.98 * layoutHeight - bCircleHeight,
        };

        // console.log("condition - 2 checked");
      } else if (bCircle.x < 0.18 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - bCircleWidth,
          bottom: 0.83 * layoutHeight - bCircleHeight,
        };
      } else if (
        bCircle.x + bCircleWidth >= 0.5 * layoutWidth &&
        bCircle.x + bCircleWidth <= 0.83 * layoutWidth
      ) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0,
          right: layoutWidth - bCircleWidth,
          bottom: 0.83 * layoutHeight - bCircleHeight,
        };
      } else if (bCircle.x + bCircleWidth >= 0.83 * layoutWidth) {
        newBounds = {
          left: 0.02 * layoutWidth,
          top: 0.1701 * layoutHeight,
          right: layoutWidth - bCircleWidth,
          bottom: 0.83 * layoutHeight - bCircleHeight,
        };
      }

      setBounds(newBounds);
    } else {
      setBounds(newBounds);
    }
  }, [
    bCircle.x,
    bCircle.y,
    layoutWidth,
    layoutHeight,
    bCircleWidth,
    bCircleHeight,
    layoutBody.layoutType,
  ]);

  return (
    <Draggable
      // bounds="parent"
      bounds={bounds}
      handle=".handle"
      onDrag={(e, ui) => handleDrag(e, ui)}
      position={{ x: bCircle.x, y: bCircle.y }}
      onStop={() => {
        if (hasMoved) {
          handleEditBShape(bCircle._id, newPositionBCircle);
          setHasMoved(false);
        }
      }}
    >
      <StyledbCircle
        ref={bCircleRef}
        // onClick={() => handleShowToggleForm(bCircle._id)}
        tabIndex={0}
        // onFocus={toggleShapeForm}
        bCircle={bCircle}
        className="circle-shape"
        // resize={showShapeForm}
      >
        <div
          className="handle circle-name"
          style={handleStyle}
          onDoubleClick={() => {
            setEditingBName(true);
            setTimeout(() => nameRef.current?.focus(), 0);
          }}
        >
          {editingBName ? (
            <input
              ref={nameRef}
              type="text"
              value={bCircleName}
              onChange={handleNameChange}
              className="input-name-cirle"
              onKeyDown={handleKeyDown}
              style={{
                width: `${Math.max(1, bCircle.name.length) * 10 - 10}%`,
                color: bCircle.color,
                fontSize: bCircle.fontSize,
              }}
            />
          ) : (
            <>{bCircle.name}</>
          )}
        </div>

        {children}
      </StyledbCircle>
    </Draggable>
  );
};

export default BcircleShape;
