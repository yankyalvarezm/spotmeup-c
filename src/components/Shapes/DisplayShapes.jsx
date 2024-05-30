import React, { useContext, useEffect, useState } from "react";
import { ShapeContext } from "../../context/shape.context";
import CircleShape from "./circle/CircleShape";
import SquareShape from "./square/SquareShape";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../context/layout.context";

const DisplayShapes = () => {
  const {
    circles,
    squares,
    shapeDeleted,
    setShapeDeleted,
    setShapeEdited,
    shapeEdited,
    fetchShapes,
    shapeAdded,
    setShapeAdded,
  } = useContext(ShapeContext);

  const { layoutDetails } = useContext(LayoutContext);

  const param = useParams();

  useEffect(() => {
    if (shapeDeleted) {
      setShapeDeleted(null);
    }
    if (shapeEdited) {
      setShapeEdited(false);
    }
    if (shapeAdded) {
      setShapeAdded(false);
    }
    fetchShapes(param.layoutIdParam);
  }, [param.layoutIdParam, shapeDeleted, shapeEdited, shapeAdded]);

  // console.log("displayScale:", layoutDetails?.displayScale);

  return (
    <div
      className="display-shapes-container"
      style={{
        // transform: `scale(${layoutDetails?.displayScale})`,
        // transition: "transform 0.1s ease-out",
      }}
    >
      {circles &&
        circles.map((circle) => (
          <CircleShape circle={circle} key={circle._id}></CircleShape>
        ))}

      {squares &&
        squares.map((square) => (
          <SquareShape square={square} key={square._id}></SquareShape>
        ))}
    </div>
  );
};

export default DisplayShapes;
