// src/components/AdminLogin.jsx
import { useState } from "react";
import api from "../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      alert("✅ Login successful!");
      window.location.href = "/";
    } catch (err) {
      setError("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Fake hidden inputs to trick browser autofill */}
        <input type="text" name="fake-username" className="hidden" autoComplete="off" />
        <input type="password" name="fake-password" className="hidden" autoComplete="new-password" />

        {/* Real email field */}
       <input
  type="email"
  placeholder="Email"
  className="w-full mb-3 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="off"
  name="real-email"
/>

<div className="flex items-center mb-3">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="flex-grow p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="new-password"
    name="real-password"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="ml-2 text-sm text-blue-600"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
