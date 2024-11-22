

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getStates = async (pageSize, pageNumber, searchText) => {
    const response = await fetch(`${BASE_URL}/states/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}

export const createStates = async (data) => {
    const response = await fetch(`${BASE_URL}/states/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}
export const getStateById = async (id) => {
    const response = await fetch(`${BASE_URL}/states/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const deleteStates = async (id) => {
    const response = await fetch(`${BASE_URL}/states/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const updateStates = async (id, data) => {
    const response = await fetch(`${BASE_URL}/states/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}