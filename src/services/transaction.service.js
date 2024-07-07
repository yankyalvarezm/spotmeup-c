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

export const createTransaction = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/transaction/create`, body);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const findTransaction = async (transactionId) => {
  try {
    const response = await axios.get(
      `${API_URL}/transaction/${transactionId}/find`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAllTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transaction/findAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
