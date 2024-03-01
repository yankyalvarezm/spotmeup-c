import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { getAllShapes } from "../services/shape.service";

const ShapeContext = createContext();

function ShapeProvider({ children }) {
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
  const shapeForm = useRef();

  const fetchShapes = async (layoutId) => {
    try {
      const response = await getAllShapes(layoutId);

      console.log("Fetch Shapes", response);
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

  const toggleShapeForm = () => {
    setShowShapeForm((prev) => !prev);
  };

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
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}

export { ShapeProvider, ShapeContext };
