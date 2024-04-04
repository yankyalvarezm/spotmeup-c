import React, { useContext, useEffect } from "react";
import { ShapeContext } from "../../context/shape.context";
import CircleShape from "./circle/CircleShape";
import SquareShape from "./square/SquareShape";
import { useParams } from "react-router-dom";

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

  return (
    <div className="display-shapes-container">
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
