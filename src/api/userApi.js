import axios from 'axios';

const BASE_URL = 'https://akemidids-backend.onrender.com/api/users';

// Complete a task
export const completeTask = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/task`, data);
    return response.data;
  } catch (error) {
    console.error("Complete Task Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (telegramId) => {
  const res = await axios.get(`${BASE_URL}/profile/${telegramId}`);
  return res.data;
};

// Update Telegram username
export const updateUsername = async (telegramId, username) => {
  const res = await axios.post(`${BASE_URL}/update-username`, { telegramId, username });
  return res.data;
};
