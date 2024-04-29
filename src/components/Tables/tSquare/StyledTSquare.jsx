import styled from "styled-components";

export const StyledTSquare = styled.div`
  position: absolute;
  width: ${(props) => props.tSquare?.width}px;
  height: ${(props) => props.tSquare?.height}px;
  background-color: ${(props) => props.tSquare?.backgroundColor};
  /* border: ${(props) => props.tSquare?.borderSize}px solid
    ${(props) => props.tSquare?.borderColor}; */
  border-left: ${(props) =>
      props.tSquare?.borderLeftSize || props.tSquare?.borderLeftSize === 0
        ? props.tSquare?.borderLeftSize
        : props.tSquare?.borderSize}px
    solid
    ${(props) =>
      props.tSquare?.borderLeftColor
        ? props.tSquare?.borderLeftColor
        : props.tSquare?.borderColor};
  border-right: ${(props) =>
      props.tSquare?.borderRightSize || props.tSquare?.borderRightSize === 0
        ? props.tSquare?.borderRightSize
        : props.tSquare?.borderSize}px
    solid
    ${(props) =>
      props.tSquare?.borderRightColor
        ? props.tSquare?.borderRightColor
        : props.tSquare?.borderColor};
  border-bottom: ${(props) =>
      props.tSquare?.borderBottomSize || props.tSquare?.borderBottomSize === 0
        ? props.tSquare?.borderBottomSize
        : props.tSquare?.borderSize}px
    solid
    ${(props) =>
      props.tSquare?.borderBottomColor
        ? props.tSquare?.borderBottomColor
        : props.tSquare?.borderColor};
  border-top: ${(props) =>
      props.tSquare?.borderTopSize || props.tSquare?.borderTopSize === 0
        ? props.tSquare?.borderTopSize
        : props.tSquare?.borderSize}px
    solid
    ${(props) =>
      props.tSquare?.borderTopColor
        ? props.tSquare?.borderTopColor
        : props.tSquare?.borderColor};
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  ${(props) => (props.resize ? "resize:both; overflow: hidden;" : "")}
  transform: translate(
    ${(props) => props.tSquare?.x}px,
    ${(props) => props.tSquare?.y}px
  );
`;
