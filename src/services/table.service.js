import { API_URL } from "./api.service";
import axios from "axios";

export const createTable = async (blockId, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/table/b/${blockId}/create`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editTable = async (tableId,body) => {
  try {
    const response = await axios.put(`${API_URL}/table/${tableId}/edit`,body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const findTable = async (tableId) => {
  try {
    const response = await axios.get(`${API_URL}/table/${tableId}/find`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllTables = async (blockId) => {
  try {
    const response = await axios.get(`${API_URL}/table/${blockId}/findAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTable = async (tableId) => {
  try {
    const response = await axios.delete(`${API_URL}/table/${tableId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
