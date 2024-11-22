

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getOrders = async (pageSize, pageNumber, searchText, status, creator, campaignId) => {
    const response = await fetch(`${BASE_URL}/order/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}&status=${status}&creator=${creator}&campaign=${campaignId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}