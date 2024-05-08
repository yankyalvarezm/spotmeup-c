import { API_URL } from "./api.service";
import axios from "axios";

export const createVenue = async (venueData) => {
  try {
    const response = await axios.post(`${API_URL}/venue/create`, venueData);
    // console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Line 10 - Error:", error);
    throw error;
  }
};

export const getAllVenues = async () => {
  try {
    const response = await axios.get(`${API_URL}/venue/findAll`);
    // console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Line 23 - Error:", error);
    throw error;
  }
};

export const editVenue = async (venueId, venueEditedValues) => {
  // console.log("venueId", venueId);

  try {
    const response = await axios.put(
      `${API_URL}/venue/${venueId}/edit`,
      venueEditedValues
    );
    // console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Line 32 - Error:", error);
    throw error;
  }
};

export const getOneVenue = async (venueId) => {
  try {
    const response = await axios.get(`${API_URL}/venue/${venueId}/find`);
    // console.log("venueId", response.data._id);

    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const deleteOneVenue = async (venueId) => {
  try {
    const response = await axios.delete(`${API_URL}/venue/${venueId}/delete`);
    // console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
