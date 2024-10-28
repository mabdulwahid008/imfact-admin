

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const approveUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/user/approveUser`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify({ 
            userId: userId
         })
    });
    return response;
}