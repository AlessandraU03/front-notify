import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const getProfile = async (token = localStorage.getItem("token")) => {
    if (!token) return null;
    try {
      const res = await api.get("/me", { headers: { Authorization: `Bearer ${token}` } });
      const profile = res.data.datos || res.data;
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      return profile;
    } catch {
      logout();
      return null;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/login", { email, password });
      const token = res.data.datos?.access_token;
      if (!token) throw new Error("No se recibió token");

      localStorage.setItem("token", token);
      const profile = await getProfile(token);
      setIsAuthenticated(!!profile);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.mensaje || err.message);
      setLoading(false);
      return false;
    }
  };

  const register = async (full_name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/register", { full_name, email, password, is_active: true });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Error al registrar usuario");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return false;
    }
    try {
      await api.post("/verify-token", {}, { headers: { Authorization: `Bearer ${token}` } });
      const profile = await getProfile(token);
      setIsAuthenticated(!!profile);
      setLoading(false);
      return !!profile;
    } catch {
      logout();
      setLoading(false);
      return false;
    }
  };


  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
