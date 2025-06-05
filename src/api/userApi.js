import axios from 'axios';




const BASE_URL = 'https://akemidids-backend.onrender/api/users';

export const completeTask = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/task`, data); // ✅ correct
    return response.data;
  } catch (error) {
    console.error("Complete Task Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get user profile (by Telegram ID)
export const getUserProfile = async (telegramId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${telegramId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
