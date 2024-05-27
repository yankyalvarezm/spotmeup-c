import styled from "styled-components";
import { useContext } from "react";
import { LayoutContext } from "../../../context/layout.context";

export const StyledSquare = styled.div`
  position: absolute;
  width: ${(props) => props.square?.width}px;
  /* width: ${(props) => props.dinamicWidth}px; */
  

  height: ${(props) => props.square?.height}px;
  background-color: ${(props) => props.square?.backgroundColor};
  /* border: ${(props) => props.square?.borderSize}px solid
    ${(props) => props.square?.borderColor}; */
  border-left: ${(props) =>
      props.square?.borderLeftSize || props.square?.borderLeftSize === 0
        ? props.square?.borderLeftSize
        : props.square?.borderSize}px
    solid
    ${(props) =>
      props.square?.borderLeftColor
        ? props.square?.borderLeftColor
        : props.square?.borderColor};
  border-right: ${(props) =>
      props.square?.borderRightSize || props.square?.borderRightSize === 0
        ? props.square?.borderRightSize
        : props.square?.borderSize}px
    solid
    ${(props) =>
      props.square?.borderRightColor
        ? props.square?.borderRightColor
        : props.square?.borderColor};
  border-bottom: ${(props) =>
      props.square?.borderBottomSize || props.square?.borderBottomSize === 0
        ? props.square?.borderBottomSize
        : props.square?.borderSize}px
    solid
    ${(props) =>
      props.square?.borderBottomColor
        ? props.square?.borderBottomColor
        : props.square?.borderColor};
  border-top: ${(props) =>
      props.square?.borderTopSize || props.square?.borderTopSize === 0
        ? props.square?.borderTopSize
        : props.square?.borderSize}px
    solid
    ${(props) =>
      props.square?.borderTopColor
        ? props.square?.borderTopColor
        : props.square?.borderColor};
  /* max-width: 100%; */
  /* max-height: 100%; */
  text-align: center;
  ${(props) => (props.resize ? "resize:both; overflow: hidden;" : "")}
  transform: translate(
    ${(props) => props.square?.x}px,
    ${(props) => props.square?.y}px
  );
  top: 0%;
  left: 0%;

`;