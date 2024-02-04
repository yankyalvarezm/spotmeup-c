import { API_URL } from "./api.service";
import axios from "axios";

export const createVenue = async (venueData) => {
  try {
    const response = await axios.post(`${API_URL}/venue/create`, venueData);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Line 10 - Error:", error);
    throw error;
  }
};

export const getAllVenues = async () => {
  try {
    const response = await axios.get(`${API_URL}/venue/findAll`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("Line 23 - Error:", error);
    throw error;
  }
};
