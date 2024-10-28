import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";




export const getUserlist = async ({ pageNumber, pageSize, searchText, role, status }) => {
    const response = await fetch(`${BASE_URL}/user/userlist/?pageNumber=${pageNumber}&pageSize=${pageSize}&searchText=${searchText}&role=${role}&status=${status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        },
    });
    const res = response.json();
    return res;
}