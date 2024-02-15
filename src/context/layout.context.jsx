import React, { createContext, useEffect, useState } from "react";
import { getOneLayout } from "../services/layout.service";

const LayoutContext = createContext();

function LayoutProvider({ children }) {
  const [showEditingModal, setShowEditingModal] = useState(null);
  const [showLayoutForm, setShowLayoutForm] = useState(null);
  const [layoutId, setLayoutId] = useState(null);
  const [layoutAdded, setLayoutAdded] = useState(null);
  const [layoutDetails, setLayoutDetails] = useState(null);
  const [showEditInput, setShowEditInput] = useState(false);
  const [layoutEdited, setLayoutEdited] = useState(null);

  const toggleEditingModal = () => {
    setShowEditingModal((prev) => !prev);
  };

  const toggleEditInput = () => {
    setShowEditInput((prev) => !prev);
  };

  const toggleLayoutForm = () => {
    setShowLayoutForm((prev) => !prev);
  };

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await getOneLayout(layoutId);
        setLayoutDetails(response.layout);
        console.log("Line 24 - Response:", response);
      } catch (error) {
        console.log("error");
      }
    };
    if (layoutId) {
      fetchLayout();
    }
  }, [layoutId]);

  return (
    <LayoutContext.Provider
      value={{
        showEditingModal,
        setShowEditingModal,
        toggleEditingModal,
        toggleLayoutForm,
        showLayoutForm,
        setShowLayoutForm,
        layoutId,
        setLayoutId,
        layoutAdded,
        setLayoutAdded,
        layoutDetails,
        setLayoutDetails,
        layoutEdited,
        setLayoutEdited,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider, LayoutContext };
