import React, { useContext } from "react";
import { LayoutContext } from "../../context/layout.context";
import styled from "styled-components";
import Draggable from "react-draggable";

const StyledDiv = styled.div`
  width: ${(props) => props.layoutBody?.width}px;
  max-width: ${(props) => props.layoutBody?.maxWidth}px;
  height: ${(props) => props.layoutBody?.height}px;
  max-height: ${(props) => props.layoutBody?.maxHeight}px;
  border: ${(props) => props.layoutBody?.borderSize}px solid #000000;
  border-radius: ${(props) => props.layoutBody?.borderRadius}%;
  left: ${(props) => props.layoutBody?.x}%;
  top: ${(props) => props.layoutBody?.y}%;
  overflow: hidden;
  resize: both;
`;

const LayoutContent = ({ children }) => {
  const { layoutBody, floorPlan } = useContext(LayoutContext);

  return (
    <StyledDiv
      layoutBody={layoutBody}
      id={floorPlan ? "layout-styled-div" : "onhold-layout"}
      className={`layout-${layoutBody.layoutType}-border`}
    >
      {" "}
      <div className={floorPlan ? `layout-${layoutBody.layoutType}` : "transparent"}></div>
      {children}
    </StyledDiv>
  );
};

export default LayoutContent;
