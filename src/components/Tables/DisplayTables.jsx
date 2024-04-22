import React, { useContext, useEffect } from "react";
import { TableContext } from "../../context/table.context";
import { BlockContext } from "../../context/block.context";
import { LayoutContext } from "../../context/layout.context";
import TsquareShape from "./tSquare/TsquareShape";
import { useParams, useNavigate } from "react-router-dom";
import TcircleShape from "./tCircle/TcircleShape";

const DisplayTables = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { blockId, setBlockId } = useContext(BlockContext);
  const { layoutId, setLayoutId } = useContext(LayoutContext);
  const { tSquares, fetchTables, tableId, tCircles } = useContext(TableContext);

  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
    if (param.blockIdParam) {
      setBlockId(param.blockIdParam);
    }
  }, [param.layoutIdParam, param.blockIdParam]);

  useEffect(() => {
    fetchTables(param.blockIdParam);
  }, []);
  // console.log("blockIdParam:", param.blockIdParam);
  // console.log("tSquares:", tSquares);

  // debugger;

  useEffect(() => {
    // debugger;
  }, [tSquares]);

  return (
    <div className="display-tables-container">
      {tSquares &&
        tSquares.map((tSquare) => (
          <TsquareShape tSquare={tSquare} key={tSquare._id}></TsquareShape>
        ))}

      {tCircles &&
        tCircles.map((tCircle) => (
          <TcircleShape tCircle={tCircle} key={tCircle._id}></TcircleShape>
        ))}
    </div>
  );
};

export default DisplayTables;
