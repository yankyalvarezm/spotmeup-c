import {API_URL} from "./auth.service";
import axios from "axios"

export const createTable = async (blockId, number=1, tableData={}) => {
    try {
        const response = await axios.post(`${API_URL}/table/${blockId}/manual/create`, {number, tableData})
        return response.data
    } catch (error) {
        throw error
    }
}
export const editTable = async (blockId, tableId, number=1, tableData={}) => {
    try {
        const response = await axios.put(`${API_URL}/table/${blockId}/${tableId}/edit`, {number, tableData})
        return response.data
    } catch (error) {
        throw error
    }
}
export const findTable = async (tableId) => {
    try {
        const response = await axios.get(`${API_URL}/table/${tableId}/find`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const getAllTables = async (blockId) => {
    try {
        const response = await axios.get(`${API_URL}/table/${blockId}/findAll`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const deleteTable = async (blockId, tableId) => {
    try {
        const response = await axios.delete(`${API_URL}/table/${blockId}/${tableId}/delete`, {number, tableData})
        return response.data
    } catch (error) {
        throw error
    }
}