import { API_URL } from "./api.service";
import axios from "axios";

export const findAllLayoutsInVenue = async (venueId) => {
  try {
    const response = await axios.get(`${API_URL}/layout/${venueId}/findAll`);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const createLayout = async (venueId, name) => {
  try {
    const response = await axios.post(`${API_URL}/layout/${venueId}/create`, {
      name,
    });
    // console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const editLayoutName = async (layoutId, name) => {
  try {
    const response = await axios.put(
      `${API_URL}/layout/${layoutId}/edit`,
      name
    );
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const getOneLayout = async (layoutId) => {
  try {
    const response = await axios.get(`${API_URL}/layout/${layoutId}/find`);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("getOneLayout - Error:", error.response);
    throw error.response;
  }
};

export const deleteLayout = async (layoutId) => {
  //remove Venue Id
  try {
    const response = await axios.delete(`${API_URL}/layout/${layoutId}/delete`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const editLayout = async (layoutId, body) => {
  try {
    const response = await axios.put(
      `${API_URL}/layout/${layoutId}/edit`,
      body
    );
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("Edit Layout:", error.response);
    throw error;
  }
};
