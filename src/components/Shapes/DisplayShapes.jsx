import React, { useContext, useState } from "react";
import { Circle, Layer, Rect, Stage, Group } from "react-konva";
import { LayoutContext } from "../../context/layout.context";

const rectWidth = 100;
const rectHeight = 100;
const circleRadius = 20;

const DisplayShapes = () => {
  const { layoutBody } = useContext(LayoutContext);
  // Estado para manejar la posición del grupo
  const [groupPos, setGroupPos] = useState({ x: 0, y: 0 });
  // Estado para manejar la posición del círculo relativa al grupo
  const [circlePos, setCirclePos] = useState({ x: rectWidth / 2, y: rectHeight / 2 });

  // Función para actualizar la posición del grupo
  const onDragEndGroup = (e) => {
    setGroupPos({ x: e.target.x(), y: e.target.y() });
  };

  // Función para manejar el movimiento del círculo dentro del rectángulo
  const onDragMoveCircle = (e) => {
    const { x, y } = e.target.position();
    // Ajusta los límites aquí según sea necesario
    const newX = Math.max(0, Math.min(x, rectWidth - circleRadius));
    const newY = Math.max(0, Math.min(y, rectHeight - circleRadius));
    setCirclePos({ x: newX, y: newY });
  };

  return (
    <Stage width={layoutBody.width} height={layoutBody.height - 50}>
      <Layer>
        <Group
          x={groupPos.x}
          y={groupPos.y}
          draggable
          onDragMove={onDragEndGroup}
        >
          <Rect
            width={rectWidth}
            height={rectHeight}
            fill="black"
          />
          <Circle
            x={circlePos.x}
            y={circlePos.y}
            radius={circleRadius}
            fill="red"
            draggable
            onDragMove={onDragMoveCircle}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default DisplayShapes;
