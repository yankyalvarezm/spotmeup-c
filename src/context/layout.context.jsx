import React, { createContext, useEffect, useState, useRef } from "react";
import { getOneLayout } from "../services/layout.service";
import { editLayout } from "../services/layout.service";

const LayoutContext = createContext();

function LayoutProvider({ children }) {
  const layoutRef = useRef(null);
  const [showEditingModal, setShowEditingModal] = useState(null);
  const [showLayoutForm, setShowLayoutForm] = useState(null);
  const [layoutId, setLayoutId] = useState(null);
  const [layoutAdded, setLayoutAdded] = useState(null);
  const [layoutDetails, setLayoutDetails] = useState(null);
  const [showEditInput, setShowEditInput] = useState(false);
  const [layoutEdited, setLayoutEdited] = useState(null);
  const [layoutDeleted, setLayoutDeleted] = useState(null);
  const [layoutGoBack, setLayoutGoBack] = useState(null);
  const [layoutBody, setLayoutBody] = useState({});
  const [floorPlan, setFloorPlan] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const toggleEditingModal = () => {
    setShowEditingModal((prev) => !prev);
  };

  const toggleLayoutForm = () => {
    setShowLayoutForm((prev) => !prev);
  };

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await getOneLayout(layoutId);
        setLayoutDetails(response.layout);
        // console.log("Line 24 - Response:", response);
      } catch (error) {
        console.log("error:", error);
      }
    };
    if (layoutId) {
      fetchLayout();
    }
  }, [layoutId]);

  const toggleFloorPlan = () => {
    setFloorPlan(false);
    setIsSelected(false);

    setLayoutBody((prevLayoutBody) => ({
      ...prevLayoutBody,
      layoutType: undefined,
    }));

    setLayoutDetails((prevLayoutBody) => ({
      ...prevLayoutBody,
      layoutType: undefined,
    }));
  };

  function debounce(fn, delay) {
    let timeoutID = null;
    return function (...args) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // console.log("isSelected:", isSelected);

  const updateLayout = debounce((layoutId, body) => {
    editLayout(layoutId, body);
    // console.log("updateLayout:", body );
  }, 1000);

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
        layoutDeleted,
        setLayoutDeleted,
        layoutBody,
        setLayoutBody,
        layoutGoBack,
        setLayoutGoBack,
        floorPlan,
        setFloorPlan,
        toggleFloorPlan,
        updateLayout,
        isSelected,
        setIsSelected,
        layoutRef,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export { LayoutProvider, LayoutContext };
