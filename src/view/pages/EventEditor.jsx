// src/views/EventEditor.jsx
import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../atoms/Button";
import EventFields from "../molecules/EventFields";
import { useEventsContext } from "../../viewModel/eventContext";
import { useEventForm } from "../../viewModel/useEventForm";

export default function EventEditor() {
  const navigate = useNavigate();
  const params = useParams();
  const editingId = params.id ? Number(params.id) : null;

  const { items, create, update } = useEventsContext();
  const current = useMemo(
    () => items.find((e) => e.id === editingId),
    [items, editingId]
  );

  const { form, setForm, errors, onChange, handleSubmit } = useEventForm(
    {
      event_name: "",
      message: "",
      recipient_name: "",
      phone_number: "+52", // default México
      scheduled_at: "",
      status: "Pendiente",
    },
    async (formData) => {
      if (editingId) await update(editingId, formData);
      else await create(formData);
      navigate("/");
    }
  );

  // 🔑 Solo inicializa el form la primera vez que encuentra el evento
  const initialized = useRef(false);
  useEffect(() => {
    if (editingId && current && !initialized.current) {
      const { id, ...rest } = current;
      setForm(rest);
      initialized.current = true;
    }
  }, [editingId, current, setForm]);

  const onLadaChange = (e) => {
    const lada = e.target.value;
    setForm((prev) => {
      const numSinLada = prev.phone_number.replace(/^(\+\d{1,3})/, "");
      return { ...prev, phone_number: `${lada}${numSinLada}` };
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "Editar Evento" : "Nuevo Evento"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded-2xl shadow"
      >
        <EventFields
          form={form}
          errors={errors}
          onChange={onChange}
          onLadaChange={onLadaChange}
        />
        <div className="flex gap-2">
          <Button type="submit">Guardar</Button>
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
