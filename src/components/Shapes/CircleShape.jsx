import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const StyledCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000;
  border: 3px solid black;
  resize: both;
  overflow: hidden;
  position: absolute;
`;

const CircleShape = ({ children }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        console.log(`Circle Width: ${width}px, Circle Height: ${height}px`);
      }
    });

    if (circleRef.current) {
      resizeObserver.observe(circleRef.current);
    }

    return () => {
      if (circleRef.current) {
        resizeObserver.unobserve(circleRef.current);
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
      <StyledCircle ref={circleRef}>
        <div className="handle" style={handleStyle}></div>
        {children}
      </StyledCircle>
    </Draggable>
  );
};

export default CircleShape;
