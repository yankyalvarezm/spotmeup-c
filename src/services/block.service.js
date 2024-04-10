import { API_URL } from "./api.service";
import axios from "axios";

export const createBlock = async (layoutId, body) => {
    try {
        const response = await axios.post(`${API_URL}/block/${layoutId}/create`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editBlock = async (blockId, body) => {
    try {
        const response = await axios.put(`${API_URL}/block/${blockId}/edit`, body)
        return response.data;
    } catch (error) {
        throw error
    }
}

export const findBlock = async (blockId) => {
    try {
        const response = await axios.get(`${API_URL}/block/${blockId}/find`)
        return response.data;
    } catch (error) {
        throw error
    }
}
export const getAllBlocks = async (layoutId) => {
    try {
        const response = await axios.get(`${API_URL}/block/${layoutId}/findAll`)
        return response.data;
    } catch (error) {
        throw error
    }
}

export const deleteBlock = async (layoutId, blockId) => {
    try {
        const response = await axios.delete(`${API_URL}/block/${layoutId}/${blockId}/delete`)
        return response.data;
    } catch (error) {
        throw error
    }
} 