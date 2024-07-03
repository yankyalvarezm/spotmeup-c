import React, { useState } from "react";
import { editEvent } from "../../services/events.service";

const EventInfo = ({ event }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    console.log("click");
    if (e.target.files && e.target.files.length) {
      // Reinicia el estado de image con los nuevos archivos.
      setImages([...e.target.files]);
      console.log("click");
    } else {
      // Si no hay archivos seleccionados, reinicia el estado a un array vacío.
      setImages([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (images) {
        images.forEach((img) => {
          formData.append("image", img);
        });
      }
      const response = await editEvent(event._id, formData);
      console.log("images - response:", response);
    } catch (error) {
      console.error("image - error:", error.response);
    }
  };

  return (
    <form className="event-info-form-container" onSubmit={handleSubmit}>
      <h1 className="normalize-font">Add Images</h1>
      {/* <label htmlFor="images">Upload Images</label> */}
      <input
        type="file"
        name="images"
        id="images"
        placeholder=""
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EventInfo;
