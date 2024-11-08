export const getAdminToken = () => {
    return localStorage.getItem('admintoken') || '';
}