import React from 'react'
import Draggable from "react-draggable";
import StyledbCircle from "./StyledbCircle";

const BcircleShape = ({children, circle}) => {
  return (
    <Draggable
      bounds="parent"
      handle=".handle"

    >
      <StyledbCircle
        circle={circle}
      >
        <div className="handle" />
        {children}
      </StyledbCircle>

    </Draggable>
  )
}

export default BcircleShape;