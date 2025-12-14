const API_BASE = '/api/camps';

const campService = {
    // Get all camps
    async getAll(options = {}) {
        const params = new URLSearchParams();
        if (options.activeOnly) params.set('active', 'true');
        if (options.limit) params.set('limit', options.limit.toString());

        const url = params.toString() ? `${API_BASE}?${params}` : API_BASE;
        const response = await fetch(url);
        return response.json();
    },

    // Get single camp by ID
    async getById(id) {
        const response = await fetch(`${API_BASE}/${id}`);
        return response.json();
    },

    // Create new camp
    async create(campData) {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campData),
        });
        return response.json();
    },

    // Update camp
    async update(id, campData) {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campData),
        });
        return response.json();
    },

    // Delete camp
    async delete(id) {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },

    // Upload files
    async uploadFiles(files) {
        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },
};

export default campService;
