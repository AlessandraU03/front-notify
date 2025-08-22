import { useEventsContext } from "../../viewModel/eventContext";
import EventTable from "../organisms/EventTable";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { items, loading, error, remove, filterByEstado, loadAll } = useEventsContext();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "todos") loadAll();
    else filterByEstado(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notificaciones</h1>
        <div className="flex gap-2">
          <select onChange={handleFilterChange} className="border rounded-lg p-2">
            <option value="todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Enviado">Enviado</option>
            
          </select>
          <Link to="/events/new"><Button>+ Nuevo Evento</Button></Link>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <EventTable items={items} onDelete={remove} />}
    </div>
  );
}
