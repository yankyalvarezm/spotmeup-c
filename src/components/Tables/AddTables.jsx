import React, { useContext } from "react";
import { BlockContext } from "../../context/block.context";
import { TableContext } from "../../context/table.context";

const AddTables = ({ block }) => {
  const { currentBlock } = useContext(BlockContext);
  const { addTableCircleManual, addTableSquareManual } =
    useContext(TableContext);


// const handleTableAdd = async () => {

//     if(currentBlock?.layout?.blockTableType === "circle"){
//         addTableCircleManual()
//     }


// }

  const renderAdd = () => {
    let tables = [];
    for (let row = 1; row <= currentBlock?.maxRow; row++) {
      for (let col = 1; col <= currentBlock?.maxCol; col++) {
        {
          /* ------------------- Grid Item --------------------------- */
        }
        tables.push(
          <div
            key={`${row}-${col}`}
            className={
              currentBlock?._id === block._id ? "grid-item" : "hide"
            }
            style={{
              backgroundColor: `${block?.backgroundColor}`,
            }}
          >
            Add
          </div>
        );
      }
    }
    return tables;
  };

  return <>{renderAdd()}</>;
};

export default AddTables;
