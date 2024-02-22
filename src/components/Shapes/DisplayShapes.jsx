import React, { useContext } from "react";
import { ShapeContext } from "../../context/shape.context";
import Draggable from "react-draggable";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";
import SquareInput from "./SquareInput";

const DisplayShapes = () => {
  const { circleCount, squareCount, showInput } = useContext(ShapeContext);

  return (
    <>
      {Array.from({ length: circleCount }, (_, index) => (
        <CircleShape key={index}></CircleShape>
      ))}

      {Array.from({ length: squareCount }, (_, index) => (
        <SquareShape key={index}>{showInput && <SquareInput />}</SquareShape>
      ))}
    </>
  );
};

export default DisplayShapes;
