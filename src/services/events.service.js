import { API_URL } from "./api.service";
import axios from "axios";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
};

export const createEvent = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}/block/${layoutId}/create`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
