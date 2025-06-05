import React, { useState } from "react";
import axios from "axios";

export default function AddTask() {
  const [name, setName] = useState("");
  const [reward, setReward] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/tasks", {
        name,
        reward: Number(reward),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Task added successfully!");
      setName("");
      setReward("");
    } catch (err) {
      setMessage("❌ Failed to add task: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleAddTask} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Add New Task</h2>
      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Reward Amount"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}