import styled from "styled-components";

export const StyledCircle = styled.div`
  width: ${(prop) => prop.circle?.width}px;
  height: ${(prop) => prop.circle?.width}px;
  border-radius: ${(prop) => prop.circle?.borderRadius || 50}%;
  background-color: ${(prop) => prop.circle?.backgroundColor};
  // border: ${(prop) => prop.circle?.borderSize}px solid
  //   ${(prop) => prop.circle?.borderColor};
  border-left: ${(props) =>
      props.circle?.borderLeftSize || props.circle?.borderLeftSize === 0
        ? props.circle?.borderLeftSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderLeftColor
        ? props.circle?.borderLeftColor
        : props.circle?.borderColor};
  border-right: ${(props) =>
      props.circle?.borderRightSize || props.circle?.borderRightSize === 0
        ? props.circle?.borderRightSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderRightColor
        ? props.circle?.borderRightColor
        : props.circle?.borderColor};
  border-bottom: ${(props) =>
      props.circle?.borderBottomSize || props.circle?.borderBottomSize === 0
        ? props.circle?.borderBottomSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderBottomColor
        ? props.circle?.borderBottomColor
        : props.circle?.borderColor};
  border-top: ${(props) =>
      props.circle?.borderTopSize || props.circle?.borderTopSize === 0
        ? props.circle?.borderTopSize
        : props.circle?.borderSize}px
    solid
    ${(props) =>
      props.circle?.borderTopColor
        ? props.circle?.borderTopColor
        : props.circle?.borderColor};
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  text-align: center;
  transform: translate(
    ${(props) => props.circle?.x}px,
    ${(props) => props.circle?.y}px
  );
  ${(props) => (props.resize ? "resize: horizontal; overflow: hidden;" : "")}
`;