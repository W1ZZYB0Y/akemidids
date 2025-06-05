// src/api/adminApi.js
import axios from 'axios';

export const fetchTasks = async () => {
  const token = localStorage.getItem('adminToken');
  try {
    const response = await axios.get('https://akemidids-backend.onrender/api/admin/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data.tasks || [];
  } catch (error) {
    console.error('Failed to load tasks', error.response?.data || error.message);
    throw error;
  }
};
