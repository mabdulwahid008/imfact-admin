

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
    const res = response.json();
    return res;
}