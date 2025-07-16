// frontend/services/api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Login (expects { email, password })
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data; // returns { token, name }
};

// Register (expects { name, email, password })
export const register = async (credentials) => {
  const response = await api.post('/api/auth/register', credentials);
  return response.data; // returns { token, name }
};

// Fetch all tasks
export const getTasks = async (token) => {
  const response = await api.get('/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create a task
export const createTask = async (task, token) => {
  const response = await api.post('/api/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a task
export const updateTask = async (id, task, token) => {
  const response = await api.put(`/api/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (id, token) => {
  const response = await api.delete(`/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
