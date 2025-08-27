// src/context/EventsProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  searchNotifications, createMassNotifications,
  suspendNotification,
  resumeNotification,
  resendNotification,
} from "../services/notificationsApi";
import { useAuth } from "../context/AuthContext";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("todos"); // ← Estado del filtro
  const { isAuthenticated, user } = useAuth();

  // Función para cargar datos según el filtro actual
  const loadData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      let data = [];
      if (filter === "todos") {
        data = await fetchNotifications();
      } else {
        data = await searchNotifications({ estado: filter });
      }

      setItems(data || []);
    } catch {
      setError("No se pudieron cargar las notificaciones");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Carga inicial y refresco automático
  useEffect(() => {
    if (isAuthenticated) {
      loadData(false);
      const interval = setInterval(() => loadData(true), 5000); // refresco cada 5s
      return () => clearInterval(interval);
    } else {
      setItems([]);
    }
  }, [isAuthenticated, user?.id, filter]);

  const create = async (evento) => {
    try {
      const res = await createNotification(evento);
      setItems(prev => [...prev, res.datos]);
    } catch {
      setError("No se pudo crear el evento");
    }
  };

  const update = async (id, evento) => {
    try {
      const res = await updateNotification(id, evento);
      setItems(prev => prev.map(e => (e.id === id ? res.datos : e)));
    } catch {
      setError("No se pudo actualizar el evento");
    }
  };

  const remove = async (id) => {
    try {
      await deleteNotification(id);
      setItems(prev => prev.filter(e => e.id !== id));
    } catch {
      setError("No se pudo eliminar la notificación");
    }
  };

  const filterByEstado = async (estado) => {
    setFilter(estado); // ← guardamos el filtro
  };

   const createMassive = async (evento) => {
    try {
      const res = await createMassNotifications(evento);
      setItems(prev => [...prev, ...(res.datos.notificaciones || [])]);
    } catch {
      setError("No se pudieron crear las notificaciones masivas");
    }
  };

  const suspend = async (id) => {
    try {
      const res = await suspendNotification(id);
      setItems(prev => prev.map(e => (e.id === id ? res.datos : e)));
    } catch {
      setError("No se pudo suspender la notificación");
    }
  };

  const resume = async (id) => {
    try {
      const res = await resumeNotification(id);
      setItems(prev => prev.map(e => (e.id === id ? res.datos : e)));
    } catch {
      setError("No se pudo reanudar la notificación");
    }
  };

  const resend = async (id, data) => {
    try {
      const res = await resendNotification(id, data);
      setItems(prev => [...prev, ...(res.datos.nuevas_notificaciones || [])]);
    } catch {
      setError("No se pudo reenviar la notificación");
    }
  };

   return React.createElement(
    EventsContext.Provider,
    { value: { items, loading, error, create, update, remove, filterByEstado, suspend,resend,resume,createMassive, loadAll: loadData } },
    children
  );
}

export const useEventsContext = () => useContext(EventsContext);
