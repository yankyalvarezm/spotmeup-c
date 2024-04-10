import React from "react";
import Draggable from "react-draggable";
import StyledbSquare from "./StyledbSquare";
const BsquareShape = ({ children, square }) => {
  return (
    <Draggable bounds="parent" handle=".handle">
      <StyledbSquare square={square}>
        <div className="handle" />
        {children}
      </StyledbSquare>
    </Draggable>
  );
};

export default BsquareShape;
