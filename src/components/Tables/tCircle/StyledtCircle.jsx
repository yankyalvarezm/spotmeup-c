import styled from "styled-components";

export const StyledtCircle = styled.div`
  width: ${(prop) => prop.tCircle?.width}px;
  height: ${(prop) => prop.tCircle?.height}px;
  border-radius: ${(prop) => prop.tCircle?.borderRadius || 50}%;
  background-color: ${(prop) => prop.tCircle?.backgroundColor};
  // border: ${(prop) => prop.tCircle?.borderSize}px solid
  //   ${(prop) => prop.tCircle?.borderColor};
  border-left: ${(props) =>
      props.tCircle?.borderLeftSize || props.tCircle?.borderLeftSize === 0
        ? props.tCircle?.borderLeftSize
        : props.tCircle?.borderSize}px
    solid
    ${(props) =>
      props.tCircle?.borderLeftColor
        ? props.tCircle?.borderLeftColor
        : props.tCircle?.borderColor};
  border-right: ${(props) =>
      props.tCircle?.borderRightSize || props.tCircle?.borderRightSize === 0
        ? props.tCircle?.borderRightSize
        : props.tCircle?.borderSize}px
    solid
    ${(props) =>
      props.tCircle?.borderRightColor
        ? props.tCircle?.borderRightColor
        : props.tCircle?.borderColor};
  border-bottom: ${(props) =>
      props.tCircle?.borderBottomSize || props.tCircle?.borderBottomSize === 0
        ? props.tCircle?.borderBottomSize
        : props.tCircle?.borderSize}px
    solid
    ${(props) =>
      props.tCircle?.borderBottomColor
        ? props.tCircle?.borderBottomColor
        : props.tCircle?.borderColor};
  border-top: ${(props) =>
      props.tCircle?.borderTopSize || props.tCircle?.borderTopSize === 0
        ? props.tCircle?.borderTopSize
        : props.tCircle?.borderSize}px
    solid
    ${(props) =>
      props.tCircle?.borderTopColor
        ? props.tCircle?.borderTopColor
        : props.tCircle?.borderColor};
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  text-align: center;
  transform: translate(
    ${(props) => props.tCircle?.x}px,
    ${(props) => props.tCircle?.y}px
  );
`;
