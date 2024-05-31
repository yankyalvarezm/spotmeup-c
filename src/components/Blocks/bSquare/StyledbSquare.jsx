import styled from "styled-components";

const StyledBSquare = styled.div`
  position: absolute;
  width: ${(props) => props.bSquare?.width}px;
  height: ${(props) => props.bSquare?.height}px;
  background-color: ${(props) => props.bSquare?.backgroundColor};
  border-left: ${(props) =>
      props.bSquare?.borderLeftSize || props.bSquare?.borderLeftSize === 0
        ? props.bSquare?.borderLeftSize
        : props.bSquare?.borderSize}px
    solid
    ${(props) =>
      props.bSquare?.borderLeftColor
        ? props.bSquare?.borderLeftColor
        : props.bSquare?.borderColor};
  border-right: ${(props) =>
      props.bSquare?.borderRightSize || props.bSquare?.borderRightSize === 0
        ? props.bSquare?.borderRightSize
        : props.bSquare?.borderSize}px
    solid
    ${(props) =>
      props.bSquare?.borderRightColor
        ? props.bSquare?.borderRightColor
        : props.bSquare?.borderColor};
  border-bottom: ${(props) =>
      props.bSquare?.borderBottomSize || props.bSquare?.borderBottomSize === 0
        ? props.bSquare?.borderBottomSize
        : props.bSquare?.borderSize}px
    solid
    ${(props) =>
      props.bSquare?.borderBottomColor
        ? props.bSquare?.borderBottomColor
        : props.bSquare?.borderColor};
  border-top: ${(props) =>
      props.bSquare?.borderTopSize || props.bSquare?.borderTopSize === 0
        ? props.bSquare?.borderTopSize
        : props.bSquare?.borderSize}px
    solid
    ${(props) =>
      props.bSquare?.borderTopColor
        ? props.bSquare?.borderTopColor
        : props.bSquare?.borderColor};
  /* max-width: 100%; */
  /* max-height: 100%; */
  text-align: center;
  ${(props) => (props.resize ? "resize:both; overflow: hidden;" : "")};
  /* transform: translate(
  ${(props) => props.bSquare?.x}px,
  ${(props) => props.bSquare?.y}px
); */
`;
export default StyledBSquare;
