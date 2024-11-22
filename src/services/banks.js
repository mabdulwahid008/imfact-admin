

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getBanks = async (pageSize, pageNumber, searchText) => {
    const response = await fetch(`${BASE_URL}/banks/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}

export const createBank = async (data) => {
    const response = await fetch(`${BASE_URL}/banks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}
export const getBankById = async (id) => {
    const response = await fetch(`${BASE_URL}/banks/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const deleteBank = async (id) => {
    const response = await fetch(`${BASE_URL}/banks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const updateBank = async (id, data) => {
    const response = await fetch(`${BASE_URL}/banks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}