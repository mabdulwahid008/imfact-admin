

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getCampaigns = async (pageSize, pageNumber, searchText, status, customer) => {
    const response = await fetch(`${BASE_URL}/campaign/?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}&status=${status}&customer=${customer}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = response.json();
    return res;
}