import { useState, useEffect } from "react";
import api from "../services/authApi";

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  setLoading(true);
  setError(null);
  try {
    const response = await api.post("/login", { email, password });

    // 👇 token viene de "datos.access_token"
    const token = response.data.datos?.access_token;

    if (!token) throw new Error("No se recibió token en la respuesta");

    localStorage.setItem("token", token);

    // 🚀 Traer perfil y setear user al instante
    await getProfile(token);

    setLoading(false);
    return token;
  } catch (err) {
    console.error("Error en login:", err.response?.data || err.message);
    setError(err.response?.data?.mensaje || "Error al iniciar sesión");
    setLoading(false);
    return null;
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

const getProfile = async (token = localStorage.getItem("token")) => {
  if (!token) return null;
  try {
    const response = await api.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
    return response.data;
  } catch (err) {
    console.log("Token inválido");
    logout();
    return null;
  }
};

  
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      await api.post(
        "/verify-token",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getProfile(token);
      return true;
    } catch (err) {
      logout();
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { login, register, loading, error, user, logout, verifyToken };
};
