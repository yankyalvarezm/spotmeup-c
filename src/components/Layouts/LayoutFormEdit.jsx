import React, { useState, useContext } from "react";
import { LayoutContext } from "../../context/layout.context";
import { editLayoutName } from "../../services/layout.service";

const LayoutFormEdit = () => {
  const {
    layoutDetails,
    setLayoutDetails,
    layoutEdited,
    setLayoutEdited,
    setLayoutId,
  } = useContext(LayoutContext);

  const [name, setName] = useState({
    name: layoutDetails?.name,
  });

  const hideInput = () => {
    setLayoutDetails(null);
    setLayoutId(null);
  };
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);
  
  const handleNameChange = (e) => {
    setName({ name: e.target.value });
    console.log("e.target.value", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editLayoutName(layoutDetails._id, name);
      console.log("response", response);

      setSuccessMessage(response.message);
      setTimeout(() => {
        setSuccessMessage(null);
        setLayoutEdited(true);
        hideInput();
      }, 1500);
    } catch (error) {
      console.log("error:", error);
      setNotSuccessMessage(error.response.data.message);
      setTimeout(() => {
        setNotSuccessMessage(null);
        hideInput();
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="layout-edit-form">
      <input type="text" value={name.name} onChange={handleNameChange} />
      <button
        type="submit"
        className="correct-btn"
        onClick={handleSubmit}
      ></button>
      <button className="incorrect-btn" onClick={hideInput}></button>

      {successMessage && (
        <h1 className="layout-success-msg">{successMessage}</h1>
      )}
      {notSuccessMessage && (
        <h1 className="layout-not-success-msg">{notSuccessMessage}</h1>
      )}
    </form>
  );
};

export default LayoutFormEdit;
