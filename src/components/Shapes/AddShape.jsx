import React, { useState, useContext } from "react";
import { ShapeContext } from "../../context/shape.context";
import { useParams } from "react-router-dom";

const AddShape = () => {
  const { addCircle, addSquare, setShowShapes, showShapes } =
    useContext(ShapeContext);

  const toggleShowShapes = () => {
    setShowShapes((prev) => !prev);
  };

  const param = useParams();

  const [shapeBody, setShapeBody] = useState({
    shapeType: "circle",
    name: "",
    width: 100,
    height: 100,
    borderSize: 1,
    borderLeftSize: 0,
    borderLeftColor: "",
    borderRightSize: 0,
    borderRightColor: "",
    borderBottomSize: 0,
    borderBottomColor: "",
    borderTopSize: 0,
    borderTopColor: "",
    borderColor: "black",
    backgroundColor: "black",
    color: "white",
    justifyContent: "",
    alignItems: "",
    x: 0,
    y: 0,
    fontSize: 15,
  });

  return (
    <div className={showShapes ? "showshapes-false" : "shape-tools-container"}>
      <h1 className="shape-tools-title">Add New Shape</h1>

     
          <div className="shape-content">
            <div
              className="shape-cirlce"
              onClick={() => addCircle(param.layoutIdParam, shapeBody)}
            ></div>
            <div
              className="shape-square"
              onClick={() => addSquare(param.layoutIdParam, shapeBody)}
            ></div>
          </div>

          
       
    </div>
  );
};

export default AddShape;
