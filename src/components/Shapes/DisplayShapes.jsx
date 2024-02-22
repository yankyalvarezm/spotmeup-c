import React, { useContext } from "react";
import { ShapeContext } from "../../context/shape.context";
import Draggable from "react-draggable";
import CircleShape from "./CircleShape";
import SquareShape from "./SquareShape";

const DisplayShapes = () => {
  const { circleCount, squareCount } = useContext(ShapeContext);

  return (
    <>
      {Array.from({ length: circleCount }, (_, index) => (
       
          <CircleShape>
           
          </CircleShape>
       
      ))}

      {Array.from({ length: squareCount }, (_, index) => (
        <SquareShape>
          
        </SquareShape>
      ))}
    </>
  );
};

export default DisplayShapes;
