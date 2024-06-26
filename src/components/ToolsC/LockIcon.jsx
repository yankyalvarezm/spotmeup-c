import React, { useContext, useState } from "react";
import { TableContext } from "../../context/table.context";

const LockIcon = () => {
  const { lockGrid, setLockGrid } = useContext(TableContext);

  const toggleGridLock = () => {
    setLockGrid((prev) => !prev);
    console.log("lockGrid:", lockGrid);
  };

  return (
    <label className="grid-lock">
      <input type="checkbox" />
      <svg
        viewBox="0 0 576 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className="lock-open"
      >
        <path
          d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"
          onClick={toggleGridLock}
        ></path>
      </svg>
      <svg
        viewBox="0 0 448 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className="lock"
      >
        <path
          d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
          onClick={toggleGridLock}
        ></path>
      </svg>
    </label>
  );
};

export default LockIcon;
