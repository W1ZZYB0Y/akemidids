import React, { useState } from "react";
import axios from "axios";

export default function AdminUserGiftPanel() {
  const [telegramId, setTelegramId] = useState("");
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`http://localhost:5000/api/admin/user/${telegramId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      setError("User not found");
      setUser(null);
    }
  };

  const giftTokens = async () => {
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        "http://localhost:5000/api/admin/gift",
        { telegramId, amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setUser((prev) => ({ ...prev, balance: res.data.balance }));
      setAmount("");
    } catch (err) {
      setError("Failed to gift tokens");
    }
  };

  return (
    <div className="p-4 rounded bg-white shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Gift Tokens to User</h2>
      <input
        className="border p-2 rounded mb-2 w-full"
        type="text"
        placeholder="Enter Telegram ID or Username"
        value={telegramId}
        onChange={(e) => setTelegramId(e.target.value)}
      />
      <button onClick={fetchUser} className="bg-blue-600 text-white px-4 py-2 rounded">
        Search User
      </button>

      {user && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Telegram ID:</strong> {user.telegramId}</p>
          <p><strong>Balance:</strong> {user.balance} JAWS</p>

          <input
            className="border p-2 rounded mt-2 w-full"
            type="number"
            placeholder="Amount to Gift"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={giftTokens}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Gift Tokens
          </button>
        </div>
      )}

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}