

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getCampaignById = async (_id) => {
    const response = await fetch(`${BASE_URL}/campaign/${_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    
    return res.campaign;
}