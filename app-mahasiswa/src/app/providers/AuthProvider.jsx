// src/app/providers/AuthProvider.jsx
import { createContext, useContext, useMemo, useState } from "react";
import * as authApi from "../../services/authService"; // pastikan file ini ada

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // ambil user dari localStorage (jika ada)
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  // LOGIN via API (JSON Server): GET /users?email=... kemudian cek password
  const login = async ({ email, password }) => {
    const u = await authApi.login({ email, password }); // throw jika tidak valid
    const auth = {
      id: u.id,
      email: u.email,
      name: u.name ?? u.email,
      ts: Date.now(),
    };
    localStorage.setItem("auth", JSON.stringify(auth));
    setUser(auth);
    return auth;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated, login, logout }), [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
