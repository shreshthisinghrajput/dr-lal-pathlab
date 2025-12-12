import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || '',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Skip refresh logic for the refresh endpoint itself to prevent infinite loop
        if (originalRequest.url?.includes('/api/auth/refresh')) {
            return Promise.reject(error);
        }

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Try to refresh the token
                await api.post('/api/auth/refresh');
                isRefreshing = false;
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                // Don't redirect on public pages
                if (typeof window !== 'undefined') {
                    const path = window.location.pathname;
                    const publicPaths = ['/', '/about', '/contact', '/tests', '/login', '/register'];
                    const isPublicPath = publicPaths.some(p => path === p || path.startsWith('/tests/'));

                    if (!isPublicPath) {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

