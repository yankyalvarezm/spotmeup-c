import React, { useContext, useEffect } from "react";
import { ShapeContext } from "../../context/shape.context";
import Draggable from "react-draggable";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";
import SquareInput from "./SquareInput";
import { useParams } from "react-router-dom";
import { getAllShapes } from "../../services/shape.service";

const DisplayShapes = () => {
  const {
    showInput,
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

  // console.log("param:", param);

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
        circles.map((circle, index) => (
          <CircleShape circle={circle} key={circle._id}></CircleShape>
        ))}

      {squares &&
        squares.map((square, index) => (
          <SquareShape square={square} key={square._id}>
            {showInput && <SquareInput />}
          </SquareShape>
        ))}
    </>
  );
};

export default DisplayShapes;
