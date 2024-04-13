import React, { createContext, useState, useRef } from "react";
import {
  getAllShapes,
  createShape,
  editShapes,
} from "../services/shape.service";

const ShapeContext = createContext();

function ShapeProvider({ children }) {
  const shapeForm = useRef();
  const [column, setColumn] = useState(3);
  const [circleCount, setCircleCount] = useState(0);
  const [circles, setCircles] = useState([]);
  const [squares, setSquares] = useState([]);
  const [squareCount, setSquareCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [shapeId, setShapeId] = useState(null);
  const [showShapeForm, setShowShapeForm] = useState(false);
  const [shapeDeleted, setShapeDeleted] = useState(null);
  const [shapeEdited, setShapeEdited] = useState(false);
  const [shapeAdded, setShapeAdded] = useState(false);
  const [showShapes, setShowShapes] = useState(false);

  const fetchShapes = async (layoutId) => {
    try {
      const response = await getAllShapes(layoutId);
      // console.log("Fetch Shapes", response);
      if (response.success) {
        const circleFilter = response.shapes.filter(
          (shape) =>
            shape.shapeType === "Circle" || shape.shapeType === "circle"
        );
        const squareFilter = response.shapes.filter(
          (shape) =>
            shape.shapeType === "Square" || shape.shapeType === "square"
        );
        setCircles(circleFilter);
        setSquares(squareFilter);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const addCircle = async (layoutId, body) => {
    setShowShapes((prev) => !prev);

    body.shapeType = "Circle";

    try {
      const response = await createShape(layoutId, body);

      if (response.success) {
        setCircles((prev) => [...prev, response.shape]);
      }
      // console.log("Shape Response:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const addSquare = async (layoutId, body) => {
    setShowShapes((prev) => !prev);

    body.shapeType = "Square";

    try {
      const response = await createShape(layoutId, body);

      if (response.success) {
        if (squares) {
          setSquares((prev) => [...prev, response.shape]);
          setShapeAdded(true);
        } else {
          setSquares([response.shape]);
        }
      }
      // console.log("Shape Response:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const toggleShapeForm = () => {
    setShowShapeForm((prev) => !prev);
  };

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const updateShape = debounce((shapeId, body) => {
    editShapes(shapeId, body);
    // console.log("Tools debounce working");
  }, 500);

  return (
    <ShapeContext.Provider
      value={{
        column,
        setColumn,
        circleCount,
        setCircleCount,
        squareCount,
        setSquareCount,
        showInput,
        setShowInput,
        circles,
        setCircles,
        squares,
        setSquares,
        shapeId,
        setShapeId,
        showShapeForm,
        setShowShapeForm,
        toggleShapeForm,
        shapeForm,
        shapeDeleted,
        setShapeDeleted,
        shapeEdited,
        setShapeEdited,
        fetchShapes,
        shapeAdded,
        setShapeAdded,
        addCircle,
        addSquare,
        showShapes,
        setShowShapes,
        updateShape,
        debounce,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}

export { ShapeProvider, ShapeContext };
