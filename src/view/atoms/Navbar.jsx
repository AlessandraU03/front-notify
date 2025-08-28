import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout, user, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
  <div className="flex flex-wrap gap-4">
    <Link to="/" className="hover:underline">Inicio</Link>
  </div>
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-sm">{user?.full_name || user?.email}</span>
    <button
      onClick={handleLogout}
      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
</nav>

  );
}
