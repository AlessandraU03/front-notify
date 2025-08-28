// src/view/pages/LoginView.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginView = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-4 rounded" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-4 rounded" required />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginView;
