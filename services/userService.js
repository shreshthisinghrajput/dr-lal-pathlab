import api from './api';

export const userService = {
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`/api/users${queryString ? `?${queryString}` : ''}`);
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    },
};

export default userService;
