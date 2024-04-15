import React, { useContext } from "react";
import { BlockContext } from "../../context/block.context";

const AddTables = ({ block }) => {
  const { currentBlock } = useContext(BlockContext);

  const renderAdd = () => {
    let tables = [];
    for (let row = 1; row <= currentBlock?.layout?.maxRow; row++) {
      for (let col = 1; col <= currentBlock?.layout?.maxCol; col++) {
        {
          /* ------------------- Grid Item --------------------------- */
        }
        tables.push(
          <div
            key={`${row}-${col}`}
            className={
              currentBlock?.layout?._id === block._id ? "grid-item" : "hide"
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
