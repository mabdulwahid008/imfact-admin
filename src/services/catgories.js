

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getCategories = async (pageSize, pageNumber, searchText) => {
    const response = await fetch(`${BASE_URL}/category/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}
export const createCategory = async (data) => {
    const response = await fetch(`${BASE_URL}/category/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}
export const getCategoryById = async (id) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const deleteCategory = async (id) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}
export const updateCategory = async (id, data) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(data)
    });
    return response;
}