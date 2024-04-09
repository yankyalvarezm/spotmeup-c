import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "../../context/layout.context";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ShapeContext } from "../../context/shape.context";

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
  ${(props) => (props.resize ? "resize: both; overflow: hidden;" : "")}
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
  } = useContext(LayoutContext);
  const layoutRef = useRef(null);
  const param = useParams();
  const { showShapeForm } = useContext(ShapeContext);
  // console.log("param:", param);

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
    >
      {" "}
      <div
        className={
          floorPlan || layoutBody.layoutType ? `layout-${layoutBody.layoutType}` : "transparent"
        }
      >
        {children}
      </div>
    </StyledDiv>
  );
};

export default LayoutContent;
