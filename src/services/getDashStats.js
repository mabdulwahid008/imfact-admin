
import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getDashStats = async () => {
    const response = await fetch(`${BASE_URL}/user/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res;
}