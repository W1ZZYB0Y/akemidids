import { useState, React } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email, password
      });
      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", paddingRight: "50px" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "5px 10px",
            cursor: "pointer",
            background: "#eee",
            border: "none"
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}