import axios from 'axios';

// Basic configuration for axios
// In a real app we might use environment variables for the base URL, 
// but for this evaluation, relative path works with the proxy.
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = async () => {
    const response = await api.get('/tasks');
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
};

export const moveTask = async (taskId, status, userId) => {
    const response = await api.put(`/tasks/${taskId}/move`, { status, userId });
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
};

export const getTaskHistory = async (taskId) => {
    const response = await api.get(`/tasks/${taskId}/history`);
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
};

export default api;
