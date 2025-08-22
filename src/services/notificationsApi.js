// src/services/notificationsApi.js
const API_URL = "http://127.0.0.1:8000/api/v1/notifications";

export async function fetchNotifications({ skip = 0, limit = 100, estado } = {}) {
  let url = `${API_URL}/?skip=${skip}&limit=${limit}`;
  if (estado) url += `&estado=${estado}`;
  
  const response = await fetch(url, {
    headers: { "accept": "application/json" }
  });
  if (!response.ok) throw new Error("Error al obtener notificaciones");
  const data = await response.json();
  return data.datos; // el array de notificaciones
}

export async function searchNotifications({ estado, limite = 20, omitir = 0 }) {
  const response = await fetch(`${API_URL}/buscar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ estado, limite, omitir }),
  });
  if (!response.ok) throw new Error("Error al buscar notificaciones");
  const data = await response.json();
  return data.datos;
}

export async function createNotification(evento) {
  const response = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  if (!response.ok) throw new Error("Error al crear notificación");
  return response.json();
}

export async function updateNotification(id, evento) {
  const response = await fetch(`${API_URL}/actualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  if (!response.ok) throw new Error("Error al actualizar notificación");
  return response.json();
}

export async function deleteNotification(id) {
  const response = await fetch(`${API_URL}/eliminar/${id}`, {
    method: "DELETE",
    headers: { accept: "application/json" },
  });

  if (!response.ok) throw new Error("Error al eliminar notificación");

  return response.json(); // devuelve {estado, mensaje, datos}
}
