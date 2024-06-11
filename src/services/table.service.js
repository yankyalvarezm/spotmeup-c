import { API_URL } from "./api.service";
import axios from "axios";

export const createTable = async (blockId, body) => {
  try {
    console.log("On Table Service", body);
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
    const response = await axios.put(
      `${API_URL}/tables/b/${tableId}/edit`,
      body
    );

    // console.log("updateTShape:", response.data);
    return response.data;
  } catch (error) {
    throw error.response;
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
export const getAllTables = async (layoutId) => {
  try {
    const response = await axios.get(`${API_URL}/layout/${layoutId}/find`);
    if (response.data.success) {
      return {
        success: response.data.success,
        tables: response.data.layout.blocks.map((block) => block.tables).flat(),
      };
    } else {
      return { success: response.data.success, tables: [] };
    }
  } catch (error) {
    throw error;
  }
};
export const getAllTablesOnBlock = async (blockId) => {
  try {
    const response = await axios.get(`${API_URL}/tables/b/${blockId}/findAll`);
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
