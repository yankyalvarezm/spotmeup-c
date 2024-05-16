import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/layout.context";
import EditModal from "../EditModal";
import {
  deleteLayout,
  findAllLayoutsInVenue,
} from "../../services/layout.service";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShapeContext } from "../../context/shape.context";
import LayoutForm from "./LayoutForm";
import LayoutFormEdit from "./LayoutFormEdit";
// import { VenuesContext } from "../../context/venues.context";

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
    layoutDeleted,
    setLayoutDeleted,
    layoutGoBack,
    setLayoutGoBack,
    setLayoutDetails,
  } = useContext(LayoutContext);
    

  
  const { setCircles, setSquares } = useContext(ShapeContext);
  const [layouts, setLayouts] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLayoutId(null);
    setLayoutDetails(null);
    setCircles([]);
    setSquares([]);
  }, []);

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

        if (layoutDeleted) {
          setLayoutDeleted(null);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchLayouts();
  }, [layoutAdded, layoutEdited, layoutDeleted]);

  const isEvenNumber = (num) => {
    return num % 2 === 0;
  };

  const handleLayoutClick = (layoutId) => {
    console.log("layoutId", layoutId);
    setLayoutId(layoutId);
  };

  const handleDelete = async (layoutId) => {
    try {
      const response = await deleteLayout(layoutId);
      console.log("Deleted Layout", response);
      setLayoutId(layoutId);
      setLayoutDeleted(true);
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToDesignPage = (layoutId) => {
    navigate(`/admin/designpage/${layoutId}`);
  };

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
                    {confirmDelete === layout._id ? (
                      <div className="layout-delete-prompt">
                        <button
                          onClick={() => {
                            handleDelete(layout._id);
                          }}
                          id="layout-delete-btn-prompt"
                        >
                          Yes
                        </button>
                        <button onClick={() => setConfirmDelete(null)}>
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="layout-delete-page">
                        <button
                          id="layout-design-prompt"
                          onClick={() => {
                            goToDesignPage(layout._id);
                          }}
                        >
                          Design
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDelete(layout._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
