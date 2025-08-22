import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  searchNotifications
} from "../services/notificationsApi";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todos los eventos
const loadAll = async (silent = false) => {
  try {
    if (!silent) setLoading(true); // solo la primera vez o cuando quieras mostrar spinner
    const data = await fetchNotifications();
    setItems(data || []);
  } catch {
    setError("No se pudieron cargar las notificaciones");
  } finally {
    if (!silent) setLoading(false);
  }
};

useEffect(() => {
  loadAll(false); // primera vez muestra spinner

  const interval = setInterval(() => {
    loadAll(true); // refresh silencioso, no parpadea
  }, 5000);

  return () => clearInterval(interval);
}, []);


  // Crear evento
  const create = async (evento) => {
    try {
      const response = await createNotification(evento);
      const newEvent = response.datos; // 👈 aquí está el evento real
      setItems(prev => [...prev, newEvent]);
    } catch {
      setError("No se pudo crear el evento");
    }
  };

  // Actualizar evento
  const update = async (id, evento) => {
    try {
      const response = await updateNotification(id, evento);
      const updated = response.datos; // 👈 igual aquí
      setItems(prev => prev.map(e => (e.id === id ? updated : e)));
    } catch {
      setError("No se pudo actualizar el evento");
    }
  };

  // Eliminar evento
  const remove = async (id) => {
    try {
      await deleteNotification(id);
      setItems(prev => prev.filter(e => e.id !== id));
    } catch {
      setError("No se pudo eliminar la notificación");
    }
  };

  // Filtrar por estado
  const filterByEstado = async (estado) => {
    try {
      setLoading(true);
      const data = await searchNotifications({ estado });
      setItems(data || []);
    } catch {
      setError("No se pudieron filtrar las notificaciones");
    } finally {
      setLoading(false);
    }
  };



    return React.createElement(
    EventsContext.Provider,
    { value: { items, loading, error, create, update, remove, filterByEstado, loadAll } },
    children
  );
}

export function useEventsContext() {
  return useContext(EventsContext);
}
