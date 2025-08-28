import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const RegisterView = () => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(fullName, email, password);
    if (success) {
      alert("Usuario registrado con éxito. Ahora inicia sesión.");
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Registrar Usuario</h1>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
