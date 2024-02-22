import React, { Children, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const StyledSquare = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  background-color: #000;
  border: 3px solid black;
  resize: both;
  overflow: hidden;
`;

const SquareShape = ({ children }) => {
  const squareRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const { height } = entry.contentRect;
        console.log(`Square Width: ${width}px`);
        console.log(`Square Heigth: ${height}px`);
      }
    });

    if (squareRef.current) {
      resizeObserver.observe(squareRef.current);
    }

    return () => {
      if (squareRef.current) {
        resizeObserver.unobserve(squareRef.current);
      }
    };
  }, []);

  const handleStyle = {
    width: "100%",
    height: "80%",
    backgroundColor: "black",
    cursor: "grab",
  };

  return (
    <Draggable bounds="parent" handle=".handle">
      <StyledSquare ref={squareRef}>
        <div className="handle" style={handleStyle}>
          {/* <h1>Drag Me</h1> */}
        </div>

        {children}
      </StyledSquare>
    </Draggable>
  );
};

export default SquareShape;
