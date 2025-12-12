import api from './api';

export const bookingService = {
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const response = await api.get(`/api/bookings${queryString ? `?${queryString}` : ''}`);
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/api/bookings/${id}`);
        return response.data;
    },

    async create(bookingData) {
        const response = await api.post('/api/bookings', bookingData);
        return response.data;
    },

    async updateStatus(id, data) {
        const response = await api.put(`/api/bookings/${id}`, data);
        return response.data;
    },
};

export default bookingService;
