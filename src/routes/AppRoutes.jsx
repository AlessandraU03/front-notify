import { Routes, Route } from "react-router-dom";
import Dashboard from "../view/pages/Dashboard";
import EventEditor from "../view/pages/EventEditor";
import LoginView from "../view/pages/LoginView";
import RegisterView from "../view/pages/RegisterView";
import { EventsProvider } from "../viewModel/eventContext";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => (
  <EventsProvider>
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/new"
        element={
          <ProtectedRoute>
            <EventEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/:id/edit"
        element={
          <ProtectedRoute>
            <EventEditor />
          </ProtectedRoute>
        }
      />
    </Routes>
  </EventsProvider>
);
