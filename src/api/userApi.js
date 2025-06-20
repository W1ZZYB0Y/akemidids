// src/api/userApi.js or ../api/userApi.js depending on your structure
import axios from 'axios';

const BASE_URL = 'https://akemidids-backend.onrender.com/api/users';

export const completeTask = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/task`, data);
    return response.data;
  } catch (error) {
    console.error("Complete Task Error:", error.response?.data || error.message);
    throw error;
  }
};

// Ensure the endpoint returns the user's referrals based on their userId
export const getUserProfile = async (telegramIdOrUsername) => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/${telegramIdOrUsername}`);
    return res.data;
  } catch (error) {
    console.error("Get User Profile Error:", error.response?.data || error.message);
    throw error;
  }
};
export const updateUsername = async (telegramId, username) => {
  try {
    const res = await axios.post(`${BASE_URL}/update-username`, { telegramId, username });
    return res.data;
  } catch (error) {
    console.error("Update Username Error:", error.response?.data || error.message);
    throw error;
  }
};
