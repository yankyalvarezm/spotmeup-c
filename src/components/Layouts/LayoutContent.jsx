import React, { useContext, useEffect, useRef } from "react";
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
  const { layoutBody, floorPlan, setLayoutBody, updateLayout, layoutId } = useContext(LayoutContext);
  const layoutRef = useRef(null);

  let element = document.querySelector("#layout-styled-div");
  useEffect(() => {
    if (layoutBody?.layoutType) {
      // console.log("element", element);
      
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
          updateLayout(layoutId, {width, height})


          // console.log("element", element);
          setLayoutBody((prevLayoutBody) => ({
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

  return (
    <StyledDiv
      layoutBody={layoutBody}
      id={floorPlan ? "layout-styled-div" : "onhold-layout"}
      className={`layout-${layoutBody.layoutType}-border`}
      ref={layoutRef}
    >
      {" "}
      <div
        className={
          floorPlan ? `layout-${layoutBody.layoutType}` : "transparent"
        }
      >
        {children}
      </div>
    </StyledDiv>
  );
};

export default LayoutContent;
