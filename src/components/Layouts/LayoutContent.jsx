import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "../../context/layout.context";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ShapeContext } from "../../context/shape.context";

const StyledDiv = styled.div`
  max-width: 1000px;
  max-height: 1000px;
  position: relative;
  left: ${props => Math.ceil((0.6 * props.layoutDetails?.displayScale - 0.1) * 100)}%;
  top: 50%;
  width: ${(props) => props.layoutBody?.width}px;
  height: ${(props) => props.layoutBody?.height}px;
  border: ${(props) => props.layoutBody?.borderSize}px solid #000000;
  border-radius: ${(props) => props.layoutBody?.borderRadius}%;
  background-color: ${(prop) => prop.layoutBody?.backgroundColor};
  overflow: hidden;
  transform-origin: center;
  transform: translate(-50%, -50%)
    ${(props) => (props.resize ? "resize: both; overflow: hidden;" : "")};
`;

const LayoutContent = ({ children }) => {
  const {
    layoutBody,
    floorPlan,
    setLayoutBody,
    setLayoutDetails,
    updateLayout,
    layoutId,
    isSelected,
    setIsSelected,
    layoutRef,
    layoutDetails,
  } = useContext(LayoutContext);

  const param = useParams();
  const { showShapeForm } = useContext(ShapeContext);

  let element = document.querySelector("#layout-styled-div");
  useEffect(() => {
    if (layoutBody?.layoutType) {
      if (element) {
        element.style.removeProperty("width");
        element.style.removeProperty("height");
      }
    }
  }, [layoutBody]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        if (width && height) {
          setLayoutBody((prevLayoutBody) => ({
            ...prevLayoutBody,
            width,
            height,
          }));
          setLayoutDetails((prevLayoutBody) => ({
            ...prevLayoutBody,
            width,
            height,
          }));
        }
      }
    });

    if (layoutRef.current) {
      resizeObserver.observe(layoutRef.current);
    }

    return () => {
      if (layoutRef.current) {
        resizeObserver.unobserve(layoutRef.current);
      }
    };
  }, []);

  const trueIsSelected = () => {
    setIsSelected(true);
  };

  return (
    <StyledDiv
      layoutBody={layoutBody}
      id={
        floorPlan || layoutBody.layoutType
          ? "layout-styled-div"
          : "onhold-layout"
      }
      className={`layout-${layoutBody.layoutType}-border`}
      ref={layoutRef}
      resize={!showShapeForm && isSelected && floorPlan}
      onClick={trueIsSelected}
      layoutDetails={layoutDetails}
    >
      {" "}
      <div
        className={
          floorPlan || layoutBody.layoutType
            ? `layout-${layoutBody.layoutType}`
            : "transparent"
        }
        style={{
          // transform: `scale(0.9)`,
          border: `2px solid black`,
        }}
      >
        {children}
      </div>
    </StyledDiv>
  );
};

export default LayoutContent;
