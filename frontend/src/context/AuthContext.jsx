// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
    if (userId) localStorage.setItem("userId", userId);
  }, [token, role, userId]);

  const login = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);

    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
