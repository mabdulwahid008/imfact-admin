export const getAdminToken = () => {
    return localStorage.getItem('token') || '';
}