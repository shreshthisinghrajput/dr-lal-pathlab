'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await authService.getMe();
            if (response.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if (response.success) {
            setUser(response.data.user);
        }
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        if (response.success) {
            setUser(response.data.user);
        }
        return response;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isPatient: user?.role === 'patient',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
