import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [searchId, setSearchId] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", reward: "", link: "" });
  const [ads, setAds] = useState("");
  const [fetchedUser, setFetchedUser] = useState(null);

  // Gift user coins
  const handleGift = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `http://localhost:5000/api/admin/gift`,
        { telegramId: searchId, amount: giftAmount },
        { headers }
      );
      alert("Gifted successfully");
    } catch (err) {
      console.error("Failed to gift user");
    }
  };

  // Search for user
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(
        `http://localhost:5000/api/admin/user/${searchId}`,
        { headers }
      );
      setFetchedUser(res.data);
    } catch (err) {
      console.error("User not found");
    }
  };

  // Add ad code
  const handleAddAd = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        "http://localhost:5000/api/admin/add-ad",
        { code: ads },
        { headers }
      );
      alert("Ad code added");
    } catch (err) {
      console.error("Failed to add ad code");
    }
  };


  // Move fetchTasks outside useEffect so it's globally accessible in the component
    const fetchTasks = async () => {
        try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("http://localhost:5000/api/admin/tasks", { headers });
        setTasks(res.data);
        } catch (err) {
        console.error("Failed to load tasks");
        }
  };
  
  // Now call fetchTasks from useEffect
  useEffect(() => {
    fetchTasks();
  }, []);
  // Add task
  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        "http://localhost:5000/api/admin/tasks",
        newTask,
        { headers }
      );
      alert("Task added");
      setNewTask({ name: "", reward: "", link: "" });
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task");
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(
        `http://localhost:5000/api/admin/tasks/${taskId}`,
        { headers }
      );
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task");
    }
  };

  // Fetch all tasks
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/tasks",
          { headers }
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* User Search & Gift */}
      <div className="card p-3 mb-4">
        <h4>User Management</h4>
        <input
          type="text"
          placeholder="Enter Telegram ID or username"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="form-control my-2"
        />
        <button className="btn btn-primary mb-2" onClick={fetchUser}>
          Search User
        </button>
        {fetchedUser && (
          <div className="mb-2">
            <p><strong>User:</strong> {fetchedUser.username || fetchedUser.telegramId}</p>
            <p><strong>IP:</strong> {fetchedUser.ip}</p>
          </div>
        )}
        <input
          type="number"
          placeholder="Gift Amount"
          value={giftAmount}
          onChange={(e) => setGiftAmount(e.target.value)}
          className="form-control my-2"
        />
        <button className="btn btn-success" onClick={handleGift}>
          Gift Coins
        </button>
      </div>

      {/* Add Ads */}
      <div className="card p-3 mb-4">
        <h4>Add Advertisement Code</h4>
        <textarea
          className="form-control mb-2"
          placeholder="Paste ad code here"
          value={ads}
          onChange={(e) => setAds(e.target.value)}
        ></textarea>
        <button className="btn btn-warning" onClick={handleAddAd}>
          Add Ad Code
        </button>
      </div>

      {/* Task Management */}
      <div className="card p-3 mb-4">
        <h4>Manage Tasks</h4>
        <input
          type="text"
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Reward"
          value={newTask.reward}
          onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Task Link"
          value={newTask.link}
          onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-info mb-3" onClick={handleAddTask}>
          Add Task
        </button>

        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={task._id}>
              <div>
                <strong>{task.name}</strong> - {task.reward} coins<br />
                <a href={task.link} target="_blank" rel="noreferrer">{task.link}</a>
              </div>
              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;