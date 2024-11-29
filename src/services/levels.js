import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getLevels = async () => {
    const response = await fetch(`${BASE_URL}/level/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = await response.json();
    return res.levels;
}

export const updateLevels = async (levels) => {
    const response = await fetch(`${BASE_URL}/level/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
        body: JSON.stringify(levels)
    });
    return response;
}

export const getFeeStats = async (granularity) => {
    const response = await fetch(`${BASE_URL}/level/getFeeStats?granularity=${granularity}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    return response;
}