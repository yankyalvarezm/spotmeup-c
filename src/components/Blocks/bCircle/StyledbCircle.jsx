import styled from "styled-components";

const StyledBCircle = styled.div`
  width: ${(prop) => prop.bCircle?.width}px;
  height: ${(prop) => prop.bCircle?.width}px;
  border-radius: ${(prop) => prop.bCircle?.borderRadius || 100}%;
  background-color: ${(prop) => prop.bCircle?.backgroundColor};
  border-left: ${(props) =>
      props.bCircle?.borderLeftSize || props.bCircle?.borderLeftSize === 0
        ? props.bCircle?.borderLeftSize
        : props.bCircle?.borderSize}px
    solid
    ${(props) =>
      props.bCircle?.borderLeftColor
        ? props.bCircle?.borderLeftColor
        : props.bCircle?.borderColor};
  border-right: ${(props) =>
      props.bCircle?.borderRightSize || props.bCircle?.borderRightSize === 0
        ? props.bCircle?.borderRightSize
        : props.bCircle?.borderSize}px
    solid
    ${(props) =>
      props.bCircle?.borderRightColor
        ? props.bCircle?.borderRightColor
        : props.bCircle?.borderColor};
  border-bottom: ${(props) =>
      props.bCircle?.borderBottomSize || props.bCircle?.borderBottomSize === 0
        ? props.bCircle?.borderBottomSize
        : props.bCircle?.borderSize}px
    solid
    ${(props) =>
      props.bCircle?.borderBottomColor
        ? props.bCircle?.borderBottomColor
        : props.bCircle?.borderColor};
  border-top: ${(props) =>
      props.bCircle?.borderTopSize || props.bCircle?.borderTopSize === 0
        ? props.bCircle?.borderTopSize
        : props.bCircle?.borderSize}px
    solid
    ${(props) =>
      props.bCircle?.borderTopColor
        ? props.bCircle?.borderTopColor
        : props.bCircle?.borderColor};
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  text-align: center;
  transform: translate(
    ${(props) => props.bCircle?.x}px,
    ${(props) => props.bCircle?.y}px
  );
  ${(props) => (props.resize ? "resize: horizontal; overflow: hidden;" : "")}
`;

export default StyledBCircle;