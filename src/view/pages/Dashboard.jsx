// src/views/Dashboard.jsx
import { useEventsContext } from "../../viewModel/eventContext";
import EventTable from "../organisms/EventTable";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const {
    items,
    loading,
    error,
    remove,
    filterByEstado,
    suspend,
    resume,
    resend,
  } = useEventsContext();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    filterByEstado(value);
  };

  return (
<div className="max-w-6xl mx-auto p-4 space-y-4">
  {/* Header */}
  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
    <h1 className="text-2xl font-bold">Notificaciones</h1>
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        onChange={handleFilterChange}
        className="border rounded-lg p-2 w-full sm:w-auto"
        defaultValue="todos"
      >
        <option value="todos">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="sent">Enviado</option>
        <option value="failed">Fallido</option>
        <option value="suspended">Suspendido</option>
      </select>
      <Link to="/events/new" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto">+ Nueva Notificación</Button>
      </Link>
    </div>
  </div>

      {/* Tabla */}
      <EventTable
        items={items}
        onDelete={remove}
        onSuspend={suspend}
        onResume={resume}
        onResend={resend}
      />

      {/* Loader */}
      {loading && <p className="text-gray-500">Cargando...</p>}
    </div>
  );
}
