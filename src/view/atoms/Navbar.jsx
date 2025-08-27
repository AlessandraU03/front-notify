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
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">Inicio</Link>
       
      </div>
      <div>
        <span className="mr-4">{user?.full_name || user?.email}</span>
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
