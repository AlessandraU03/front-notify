// src/organisms/EventTable.jsx
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const statusMap = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  scheduled: { label: "Programado", color: "bg-blue-100 text-blue-700" },
  sent: { label: "Enviado", color: "bg-green-100 text-green-700" },
  failed: { label: "Fallido", color: "bg-red-100 text-red-700" },
  suspended: { label: "Suspendido", color: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Cancelado", color: "bg-gray-200 text-gray-600" },
};

const MySwal = withReactContent(Swal);

export default function EventTable({
  items,
  onDelete,
  onSuspend,
  onResume,
  onResend,
}) {
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
          {items.map((e) => {
            const estado =
              statusMap[e.status] || {
                label: e.status,
                color: "bg-gray-100 text-gray-700",
              };

            return (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.event_name}</td>
                <td className="p-3">{e.recipient_name}</td>
                <td className="p-3">{e.phone_number}</td>
                <td className="p-3">
                  {e.scheduled_at
                    ? new Date(e.scheduled_at).toLocaleString()
                    : "No programado"}
                </td>
                <td className="p-3">
                  <Badge color={estado.color}>{estado.label}</Badge>
                </td>
                <td className="p-3 space-x-2">
                  {/* Editar */}
                  <Link to={`/events/${e.id}/edit`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Editar
                    </Button>
                  </Link>

                  {/* Eliminar */}
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => onDelete(e.id)}
                  >
                    Eliminar
                  </Button>

                  {/* Suspender / Reanudar */}
                  {(e.status === "pending" || e.status === "scheduled") && (
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => onSuspend(e.id)}
                    >
                      Suspender
                    </Button>
                  )}
                  {e.status === "suspended" && (
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => onResume(e.id)}
                    >
                      Reanudar
                    </Button>
                  )}

{e.status === "sent" && (
  <Button
    className="bg-purple-500 hover:bg-purple-600"
    onClick={async () => {
      const { value: action } = await MySwal.fire({
        title: "¿Desea reenviar la notificación?",
        text: "Puede reenviar al número original o a otros números.",
        icon: "question",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Sí, al número original",
        denyButtonText: "Sí, a otros números",
        cancelButtonText: "Cancelar",
      });

      if (action === undefined) return; // Cancelar

      if (action) {
        // Reenvío al número original
        await onResend(e.id, {
          phone_numbers: [e.phone_number],
          recipient_names: [e.recipient_name],
        });
        MySwal.fire(
          "Enviado",
          "La notificación fue reenviada al número original",
          "success"
        );
      } else {
        // Modal con textarea para varios destinatarios
        const { value: input } = await MySwal.fire({
          title: "Ingrese los destinatarios",
          html: `<textarea id="swal-input" class="w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-blue-200 min-h-[120px]" placeholder="+521234567890, Pedro Martínez\n+521234567891, Juan Pérez"></textarea>`,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            const val = document.getElementById("swal-input")?.value;
            if (!val || !val.trim()) {
              Swal.showValidationMessage("Debe ingresar al menos un destinatario");
              return null;
            }
            return val;
          },
        });

        if (!input) return;

        // Procesar líneas
        const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
        const phone_numbers = [];
        const recipient_names = [];

        lines.forEach((line, index) => {
          const parts = line.split(",");
          phone_numbers.push(parts[0].trim());
          recipient_names.push(parts[1]?.trim() || `Destinatario ${index + 1}`);
        });

        await onResend(e.id, { phone_numbers, recipient_names });

        MySwal.fire(
          "Enviado",
          `La notificación fue reenviada a ${phone_numbers.length} destinatarios`,
          "success"
        );
      }
    }}
  >
    Reenviar
  </Button>
)}



                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
