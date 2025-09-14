// src/services/auth.js

// Simple helper: returns true if token exists, false if not
export const isAdmin = () => {
  return !!localStorage.getItem("token");
};
