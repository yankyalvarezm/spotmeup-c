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
    const response = await axios.post(`${API_URL}/event/create`, body, headers);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editEvent = async (eventId, body) => {
  try {
    const response = await axios.put(`${API_URL}/event/${eventId}/edit`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findEvent = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/event/${eventId}/find`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/findAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const findAllUserEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/user/findAll`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/event/${eventId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const imageUploader = async (eventId, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/event/${eventId}/image/upload`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
