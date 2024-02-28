import React, { useContext, useEffect } from "react";
import { ShapeContext } from "../../context/shape.context";
import Draggable from "react-draggable";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";
import SquareInput from "./SquareInput";

const DisplayShapes = () => {
  const { showInput, circles, squares, shapeDeleted, setShapeDeleted } =
    useContext(ShapeContext);
  useEffect(() => console.log("squares:", squares));
  useEffect(() => console.log("circles:", circles));

  return (
    <>
      {circles.map((circle, index) => (
        <CircleShape circle={circle} key={index}></CircleShape>
      ))}

      {squares.map((square, index) => (
        <SquareShape square={square} key={index}>
          {showInput && <SquareInput />}
        </SquareShape>
      ))}

      {/* {Array.from({ length: squares.length }, (_, index) => (
        <SquareShape square={square} key={index}>{showInput && <SquareInput />}</SquareShape>
      ))} */}
    </>
  );
};

export default DisplayShapes;
