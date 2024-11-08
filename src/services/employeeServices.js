import { BASE_URL } from "../constants";
import { getAdminToken } from "../utils/getAdminToken";

export const createEmployee = async (employeeData) => {
  const response = await fetch(`${BASE_URL}/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    },
    body: JSON.stringify(employeeData)
  });
  return response;
};
export const login = async (employeeData) => {
  const response = await fetch(`${BASE_URL}/employee/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData)
  });
  return response;
};

export const getEmployees = async (pageSize = 25, pageNumber = 1, searchText = "") => {
  const response = await fetch(`${BASE_URL}/employee?pageSize=${pageSize}&pageNumber=${pageNumber}&searchText=${searchText}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    }
  });
  const res = await response.json();
  return res;
};
export const getMyProfile = async () => {
  const response = await fetch(`${BASE_URL}/employee/getMyProfile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    }
  });
  const res = await response.json();
  if(response.status === 200) 
  return res.employee;
  else return null;
};

export const getEmployeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/employee/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    }
  });
  const res = await response.json();
  return res;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${BASE_URL}/employee/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    },
    body: JSON.stringify(employeeData)
  });
  const res = await response.json();
  return res;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${BASE_URL}/employee/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    }
  });
  return response;
};

export const deactivateEmployee = async (id) => {
  const response = await fetch(`${BASE_URL}/employee/${id}/deactivate`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      token: getAdminToken()
    }
  });
  return response;
};
