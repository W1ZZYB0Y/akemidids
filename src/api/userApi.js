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

// Get user profile by telegramId or username fallback
export const getUserProfile = async (telegramIdOrUsername) => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/${telegramIdOrUsername}`);
    return res.data;
  } catch (error) {
    console.error("Get User Profile Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update Telegram username
export const updateUsername = async (telegramId, username) => {
  try {
    const res = await axios.post(`${BASE_URL}/update-username`, { telegramId, username });
    return res.data;
  } catch (error) {
    console.error("Update Username Error:", error.response?.data || error.message);
    throw error;
  }
};
