import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";

export const getPayments = async(pageSize, pageNumber, searchText) => {
    const response = await fetch(`${BASE_URL}/payments?pageSize=${pageSize}&page=${pageNumber}&searchText=${searchText}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token: getAdminToken()
        }
    });
    return await response.json();
}