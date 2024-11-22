

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getUserInfo = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/getUserInfo/?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}