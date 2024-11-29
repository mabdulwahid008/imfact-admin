import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getUserGraphStats = async ( granularity ) => {
    const response = await fetch(`${BASE_URL}/user/graph?granularity=${granularity}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}