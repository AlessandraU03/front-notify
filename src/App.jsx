import Navbar from "./view/atoms/Navbar";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppWrapper() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}
