import React, { useContext, useEffect } from "react";
import { TableContext } from "../../context/table.context";
import { BlockContext } from "../../context/block.context";
import { LayoutContext } from "../../context/layout.context";
import TsquareShape from "./tSquare/TsquareShape";
import { useParams, useNavigate } from "react-router-dom";

const DisplayTables = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { blockId, setBlockId } = useContext(BlockContext);
  const { layoutId, setLayoutId } = useContext(LayoutContext);
  const { tSquares, fetchTables, tableId } = useContext(TableContext);

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

  // console.log("tSquares:", tSquares);

  return (
    <div className="display-tables-container">
      {tSquares &&
        tSquares.map((tSquare) => (
          <TsquareShape tSquare={tSquare} key={tSquare._id}></TsquareShape>
        ))}
    </div>
  );
};

export default DisplayTables;
