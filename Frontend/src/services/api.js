import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await api.post('/api/auth/register', credentials);
  return response.data;
};

export const getTasks = async (token) => {
  const response = await api.get('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (task, token) => {
  const response = await api.post('/api/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (id, task, token) => {
  const response = await api.put(`/api/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (id, token) => {
  const response = await api.delete(`/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};