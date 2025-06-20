import axios from 'axios';

export const fetchTasks = async () => {
  try {
    const response = await axios.get('https://akemidids-backend.onrender/api/admin/tasks');
    return response.data.tasks || []; // make sure your backend sends { tasks: [...] }
  } catch (error) {
    console.error('Failed to load tasks', error);
    return [];
  }
};
