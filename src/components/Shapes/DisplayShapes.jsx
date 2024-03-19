import React, { useContext, useEffect } from "react";
import { ShapeContext } from "../../context/shape.context";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";
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
    <>
      {circles &&
        circles.map((circle) => (
          <CircleShape circle={circle} key={circle._id}></CircleShape>
        ))}

      {squares &&
        squares.map((square) => (
          <SquareShape square={square} key={square._id}></SquareShape>
        ))}
    </>
  );
};

export default DisplayShapes;
