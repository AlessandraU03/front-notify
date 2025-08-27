// src/views/EventEditor.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../atoms/Button";
import EventFields from "../molecules/EventFields";
import { useEventsContext } from "../../viewModel/eventContext";
import { useEventForm } from "../../viewModel/useEventForm";

export default function EventEditor() {
  const navigate = useNavigate();
  const params = useParams();
  const editingId = params.id ? Number(params.id) : null;

  const { items, create, update, createMassive } = useEventsContext();
  const current = useMemo(
    () => items.find((e) => e.id === editingId),
    [items, editingId]
  );

  const { form, setForm, errors, onChange } = useEventForm(
    {
      event_name: "",
      message: "",
      recipient_name: "",
      phone_number: "+52", // default México
      scheduled_at: "",
      status: "pending",
    }
  );

  const [isMassive, setIsMassive] = useState(false);
  const [recipientsText, setRecipientsText] = useState("");

  // Inicializa si estamos editando
  const initialized = useRef(false);
  useEffect(() => {
    if (editingId && current && !initialized.current) {
      const { id, ...rest } = current;
      setForm(rest);
      initialized.current = true;
    }
  }, [editingId, current, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isMassive) {
      const recipients = recipientsText
        .split("\n")
        .map((line, i) => {
          const [phone, name] = line.split(",").map((s) => s.trim());
          return {
            phone_number: phone,
            recipient_name: name || `Destinatario ${i + 1}`,
          };
        });

      await createMassive({ ...form, recipients, status: "pending" });
    } else {
      if (editingId) {
        await update(editingId, form);
      } else {
        await create({ ...form, status: "pending" });
      }
    }

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "Editar Notificación" : "Nueva Notificación"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded-2xl shadow"
      >
        <EventFields
          form={form}
          errors={errors}
          onChange={onChange}
          isMassive={isMassive}
          setIsMassive={setIsMassive}
          recipientsText={recipientsText}
          setRecipientsText={setRecipientsText}
        />
        <div className="flex gap-2">
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            {isMassive ? "Enviar Masivo" : "Guardar"}
          </Button>
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
