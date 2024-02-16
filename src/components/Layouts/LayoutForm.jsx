import React, { useState, useContext } from "react";
import { createLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../context/layout.context";

const LayoutForm = () => {
  const [name, setName] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);
  const [layoutTitle, setLayoutTitle] = useState(true);
  const params = useParams();
  const { toggleLayoutForm, layoutAdded, setLayoutAdded } =
    useContext(LayoutContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const toggleInputClass = () => {
    setLayoutTitle((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLayout(params.venueIdParam, name);
      console.log("response", response);
      setSuccessMessage(response.message);
      console.log("success message:", successMessage);
      setTimeout(() => {
        toggleInputClass();
        setSuccessMessage(null);
        toggleLayoutForm();
        setLayoutAdded(true)
      }, 3000);
    } catch (error) {
      console.log("error:", error);
      setNotSuccessMessage(error.response.data.message);
      console.log("not success message:", notSuccessMessage);
      setTimeout(() => {
        setNotSuccessMessage(null);
      }, 3000);
    }
  };

  return (
    <form className="layout-form-container">
      <input type="text" name="name" value={name} onChange={handleNameChange} />

      {layoutTitle && (
        <>
          <button
            type="submit"
            className="correct-btn"
            onClick={handleSubmit}
          ></button>
          <button className="incorrect-btn"></button>
        </>
      )}

      {successMessage && (
        <h1 className="layout-success-msg">{successMessage}</h1>
      )}
      {notSuccessMessage && (
        <h1 className="layout-not-success-msg">{notSuccessMessage}</h1>
      )}
    </form>
  );
};

export default LayoutForm;
