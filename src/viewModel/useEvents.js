// src/viewmodel/useEvents.js
import { useEffect, useState } from "react";
import { NotificationEvent } from "../model/NotificationEvent";

// Datos simulados
const seed = [
  new NotificationEvent(1, "Lluvia intensa", "Se espera lluvia a las 6pm", "Juan Pérez", "+521234567890", "2025-08-16T18:00", "Pendiente"),
  new NotificationEvent(2, "Corte de luz", "El servicio eléctrico se suspenderá mañana a las 10am", "María López", "+521987654321", "2025-08-17T10:00", "Enviado"),
];

export const useEvents = () => {
  const [items, setItems] = useState(seed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (input) => {
    const newEvent = new NotificationEvent(Date.now(), input.event_name, input.message, input.recipient_name, input.phone_number, input.scheduled_at);
    setItems(prev => [...prev, newEvent]);
  };

  const update = async (id, input) => {
    setItems(prev => prev.map(e => (e.id === id ? { ...e, ...input } : e)));
  };

  const remove = async (id) => {
    setItems(prev => prev.filter(e => e.id !== id));
  };

  useEffect(() => {
    setLoading(true);
    try {
      setItems(seed);
    } catch (e) {
      setError("Error cargando eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, loading, error, create, update, remove };
};
