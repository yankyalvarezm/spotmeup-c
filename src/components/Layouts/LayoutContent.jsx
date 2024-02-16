import React, { useContext } from "react";
import { LayoutContext } from "../../context/layout.context";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: ${(props) => props.layoutDetails?.width}px;
  maxwidth: ${(props) => props.layoutDetails?.maxWidth}px;
  height: ${(props) => props.layoutDetails?.height}px;
  maxheight: ${(props) => props.layoutDetails?.maxHeight}px;
  border: ${(props) => props.layoutDetails?.borderSize}px solid black;
  borderradius: ${(props) => props.layoutDetails?.borderRadius}%;
`;

const LayoutContent = ({ children }) => {
  const { layoutDetails } = useContext(LayoutContext);

  return (
    <StyledDiv layoutDetails={layoutDetails}> Content {children}</StyledDiv>
  );
};

export default LayoutContent;
