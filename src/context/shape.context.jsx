import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { LayoutContext } from "./layout.context";
import { getAllShapes } from "../services/shape.service";
const ShapeContext = createContext();

function ShapeProvider({ children }) {
  const { layoutId } = useContext(LayoutContext);
  const [column, setColumn] = useState(3);
  const [circleCount, setCircleCount] = useState(0);
  const [circles, setCircles] = useState([]);
  const [squares, setSquares] = useState([]);
  const [squareCount, setSquareCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [shapeId, setShapeId] = useState(null);
  const [showShapeForm, setShowShapeForm] = useState(false);
  const [shapeDeleted, setShapeDeleted] = useState(null);
  const shapeForm = useRef();

  useEffect(() => {
    const fetchShapes = async (layoutId) => {
      try {
        const response = await getAllShapes(layoutId);
        console.log("Shapes Response: ", response);
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
          // setCircleCount(circleFilter.length);
          setSquares(squareFilter);
          // setSquareCount(squareFilter.length);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    if (shapeDeleted) {
      setShapeDeleted(null);
    }

    fetchShapes(layoutId);
  }, [layoutId, shapeDeleted]);

  const toggleShapeForm = () => {
    setShowShapeForm((prev) => !prev);
  };

  // console.log("circles", circles.length);
  // console.log("squares", squares.length);
  // console.log("layoutId from Shapes:", layoutId);

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
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}

export { ShapeProvider, ShapeContext };
