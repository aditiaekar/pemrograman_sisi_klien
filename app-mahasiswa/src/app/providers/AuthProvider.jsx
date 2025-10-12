// src/app/providers/AuthProvider.jsx
import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("auth") === "1");

  const login = ({ email, password }) => {
    const VALID = { email: "admin@kampus.ac.id", password: "admin123" };
    const ok = email === VALID.email && password === VALID.password;
    setAuthenticated(ok);
    return ok;
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
