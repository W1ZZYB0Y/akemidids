// src/pages/AdminPanel.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [telegramId, setTelegramId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [giftAmount, setGiftAmount] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', reward: 0 });
  const [adCode, setAdCode] = useState('');

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${telegramId}`);
      setUserInfo(res.data);
    } catch (err) {
      alert('User not found');
      setUserInfo(null);
    }
  };

  const giftCurrency = async () => {
    try {
      await axios.post(`/api/users/gift`, {
        telegramId,
        amount: Number(giftAmount),
      });
      alert('Gifted successfully');
    } catch (err) {
      alert('Failed to gift currency');
    }
  };

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.name || !newTask.reward) return;
    await axios.post('/api/tasks', newTask);
    setNewTask({ name: '', reward: 0 });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center">Admin Panel</h2>

      <div className="card bg-dark p-3 my-3">
        <h4>User Search</h4>
        <input
          type="text"
          placeholder="Telegram ID"
          className="form-control"
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
        />
        <button onClick={fetchUser} className="btn btn-primary mt-2">Search</button>

        {userInfo && (
          <div className="mt-3">
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>IP Address:</strong> {userInfo.ip}</p>
            <p><strong>Balance:</strong> {userInfo.balance}</p>

            <div className="d-flex">
              <input
                type="number"
                placeholder="Amount to gift"
                className="form-control me-2"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
              />
              <button className="btn btn-success" onClick={giftCurrency}>Gift</button>
            </div>
          </div>
        )}
      </div>

      <div className="card bg-dark p-3 my-3">
        <h4>Manage Tasks</h4>
        <ul className="list-group mb-3">
          {tasks.map(task => (
            <li key={task._id} className="list-group-item bg-dark text-white d-flex justify-content-between">
              {task.name} - {task.reward}
              <button onClick={() => deleteTask(task._id)} className="btn btn-sm btn-danger">Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Reward"
          value={newTask.reward}
          onChange={(e) => setNewTask({ ...newTask, reward: Number(e.target.value) })}
        />
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>

      <div className="card bg-dark p-3 my-3">
        <h4>Ad Management (PropellerAds)</h4>
        <textarea
          className="form-control mb-2"
          placeholder="Paste your ad code here"
          value={adCode}
          onChange={(e) => setAdCode(e.target.value)}
          rows={4}
        />
        <div dangerouslySetInnerHTML={{ __html: adCode }} />
      </div>
    </div>
  );
};

export default AdminPanel;