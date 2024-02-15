import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/layout.context";
import EditModal from "../EditModal";
import { findAllLayoutsInVenue } from "../../services/layout.service";
import { useParams, Link } from "react-router-dom";
import LayoutForm from "./LayoutForm";
import LayoutFormEdit from "./LayoutFormEdit";

const DisplayLayouts = () => {
  const {
    toggleEditingModal,
    showEditingModal,
    toggleLayoutForm,
    showLayoutForm,
    setLayoutId,
    layoutId,
    layoutAdded,
    setLayoutAdded,
    layoutDetails,
    layoutEdited,
    setLayoutEdited,
  } = useContext(LayoutContext);
  const [layouts, setLayouts] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await findAllLayoutsInVenue(params.venueIdParam);

        setLayouts(response.layouts);
        if (layoutAdded) {
          setLayoutAdded(null);
        }

        if (layoutEdited) {
          setLayoutEdited(null);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchLayouts();
  }, [layoutAdded, layoutEdited]);

  const isEvenNumber = (num) => {
    return num % 2 === 0;
  };

  const handleLayoutClick = (layoutId) => {
    console.log("layoutId", layoutId);
    setLayoutId(layoutId);
  };

  console.log("layoutDetails:", layoutDetails);

  return (
    <>
      <div className="layout-title-container-parent">
        <div className="layout-title-container">
          <h1 className="layout-title">Layouts</h1>
          <button className="layout-add-btn" onClick={toggleLayoutForm}>
            Add New Layout
          </button>
        </div>

        {showEditingModal && <EditModal />}
      </div>

      {showLayoutForm && <LayoutForm />}
      <div className="layouts-display-container">
        {layouts &&
          [...layouts].reverse().map((layout, index) => (
            <div
              key={index}
              className={
                isEvenNumber(index)
                  ? "layout-content-container"
                  : "layout-content-container2"
              }
            >
              <div className="layout-map-content">
                {layoutDetails && layoutDetails._id === layout._id ? (
                  <LayoutFormEdit />
                ) : (
                  <div className="layout-table-container">
                    <div className="layout-table">
                      <h1 className="layout-display-font">{layout.name}</h1>

                      <Link
                        className="edit-icon"
                        onClick={() => handleLayoutClick(layout._id)}
                      ></Link>
                    </div>

                    <button>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DisplayLayouts;
