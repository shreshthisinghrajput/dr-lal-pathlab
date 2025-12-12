import api from './api';

export const testService = {
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`/api/tests${queryString ? `?${queryString}` : ''}`);
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/api/tests/${id}`);
        return response.data;
    },

    async getCategories() {
        const response = await api.get('/api/tests/categories');
        return response.data;
    },

    async create(testData) {
        const response = await api.post('/api/tests', testData);
        return response.data;
    },

    async update(id, testData) {
        const response = await api.put(`/api/tests/${id}`, testData);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/api/tests/${id}`);
        return response.data;
    },
};

export default testService;
