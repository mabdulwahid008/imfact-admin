

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getOrders = async (pageSize, pageNumber, searchText, status, creator) => {
    const response = await fetch(`${BASE_URL}/order/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}&status=${status}&creator=${creator}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = response.json();
    return res;
}