import { API_URL } from "./api.service";
import axios from "axios";

export const createTable = async (blockId, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/tables/b/${blockId}/create`,
      body
    );
    // console.log("create table - response.data:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editTable = async (tableId, body) => {
  try {
    const response = await axios.put(`${API_URL}/tables/${tableId}/edit`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const findTable = async (tableId) => {
  try {
    const response = await axios.get(`${API_URL}/tables/${tableId}/find`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllTables = async (blockId) => {
  try {
    const response = await axios.get(`${API_URL}/tables/${blockId}/findAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTable = async (tableId) => {
  try {
    const response = await axios.delete(`${API_URL}/tables/${tableId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
