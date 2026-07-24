
import React, { createContext, useState, useContext, useEffect } from "react";
import { login, register } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    const res = await login(credentials);

    setUser(res.data);

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("userId", res.data.id);

    return res.data;
  };

  const handleRegister = async (data) => {
    const res = await register(data);

    setUser(res.data);

    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("userId", res.data.id);

    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleRegister, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);