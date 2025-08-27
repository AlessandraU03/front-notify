// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};
