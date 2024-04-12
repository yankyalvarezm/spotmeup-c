import { API_URL } from "./api.service";
import axios from "axios";

export const createShape = async (layoutId, shapeBody) => {
  try {
    const response = await axios.post(
      `${API_URL}/shape/${layoutId}/create`,
      shapeBody
    );
    console.log("Line 11 - response.data:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const getAllShapes = async (layoutId) => {
  try {
    const response = await axios.get(`${API_URL}/shape/${layoutId}/findAll`);
    // console.log("Line 22 - response", response);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const editShapes = async (shapeId, body) => {
  try {
    const response = await axios.put(`${API_URL}/shape/${shapeId}/edit`, body);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const deleteShape = async (shapeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/shape/${shapeId}/delete`
    );

    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
