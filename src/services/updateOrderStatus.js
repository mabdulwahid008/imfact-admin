

import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const updateOrderSatus = async (_id, status) => {
    const response = await fetch(`${BASE_URL}/order/${_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify({
            status,
            _id
        })
    });
    return response;
}