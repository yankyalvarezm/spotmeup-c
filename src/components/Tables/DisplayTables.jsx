import React, { useContext, useEffect, useRef } from "react";
import { TableContext } from "../../context/table.context";
import { BlockContext } from "../../context/block.context";
import { LayoutContext } from "../../context/layout.context";
import TsquareShape from "./tSquare/TsquareShape";
import { useParams, useNavigate } from "react-router-dom";
import TcircleShape from "./tCircle/TcircleShape";

const DisplayTables = ({blockId}) => {
  const param = useParams();
  const navigate = useNavigate();

  // const { blockId, setBlockId } = useContext(BlockContext);
  const { layoutId, setLayoutId } = useContext(LayoutContext);
  const { tSquares, fetchTables, tableId, tCircles, containerRef } = useContext(TableContext);
  const { currentBlock } = useContext(BlockContext);

  useEffect(() => {
    if (param.layoutIdParam) {
      setLayoutId(param.layoutIdParam);
    }
    // if (param.blockIdParam) {
    //   setBlockId(param.blockIdParam);
    // }
  }, [param.layoutIdParam, param.blockIdParam]);

  const displayTablesRef = useRef(null)

  useEffect(() => {
      fetchTables(param.layoutIdParam);
  }, []);
  // console.log("blockIdParam:", param.blockIdParam);
  // console.log("tCircles from Display Tables:", tCircles);

  // console.log("displayTablesRef:", displayTablesRef?.current?.offsetWidth)

  // debugger;

  useEffect(() => {
    // debugger;
  }, [tSquares]);

  return (
    <div className="display-tables-container" ref={displayTablesRef}>
      {tSquares &&
        tSquares.map((tSquare) => {
          if(tSquare.block == blockId){
            return (<TsquareShape 
              tSquare={tSquare} 
              key={tSquare._id} 
              currentBlock={tSquare.block === currentBlock?._id ? currentBlock : null}
              containerWidth={displayTablesRef?.current?.offsetWidth}
              containerHeight={displayTablesRef?.current?.offsetHeight}
              blockId={blockId}
              ></TsquareShape>)
          }
      })
        }

      {tCircles &&
        tCircles.map((tCircle) => 
        {
          if(tCircle.block == blockId){
            
            return(<TcircleShape 
              tCircle={tCircle} 
              key={tCircle._id}
              currentBlock={tCircle.block === currentBlock?._id ? currentBlock : null}
              containerWidth={displayTablesRef?.current?.offsetWidth}
              containerHeight={displayTablesRef?.current?.offsetHeight}
              blockId={blockId}
              ></TcircleShape>)
          }
      }
        )}
    </div>
  );
};

export default DisplayTables;
