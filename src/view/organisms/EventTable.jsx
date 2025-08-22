import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import { Link } from 'react-router-dom';

export default function EventTable({ items, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Evento</th>
            <th className="p-3">Destinatario</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Programado</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.filter(e => e.id).map(e => (
            <tr key={e.id} className="border-t">
              <td className="p-3">{e.event_name}</td>
              <td className="p-3">{e.recipient_name}</td>
              <td className="p-3">{e.phone_number}</td>
              <td className="p-3">
  {e.scheduled_at ? new Date(e.scheduled_at).toLocaleString() : "No programado"}
</td>

              <td className="p-3">
                <Badge color={
                  e.status === 'Enviado' ? 'green' :
                  e.status === 'Pendiente' ? 'yellow' :
                  'red'
                }>
                  {e.status}
                </Badge>
              </td>
              <td className="p-3 space-x-2">
                <Link to={`/events/${e.id}/edit`}>
                  <Button className="bg-blue-500 hover:bg-blue-600">Editar</Button>
                </Link>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(e.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
