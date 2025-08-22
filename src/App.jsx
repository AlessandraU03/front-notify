// src/App.js
import { Route, Routes } from "react-router-dom";
import Navbar from "./view/atoms/Navbar";
import Dashboard from "./view/pages/Dashboard";
import EventEditor from "./view/pages/EventEditor";
import { EventsProvider } from "./viewModel/eventContext"; // <--- Importar

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <EventsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events/new" element={<EventEditor />} />
            <Route path="/events/:id/edit" element={<EventEditor />} />
          </Routes>
        </EventsProvider>
      </main>
    </div>
  );
}
