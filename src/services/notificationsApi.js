const API_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchNotifications({ skip = 0, limit = 100, estado } = {}) {
  let url = `${API_URL}/?skip=${skip}&limit=${limit}`;
  if (estado) url += `&estado=${estado}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener notificaciones");
  const data = await response.json();
  return data.datos;
}

export async function searchNotifications({ estado, limite = 20, omitir = 0 }) {
  const response = await fetch(`${API_URL}/buscar`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ estado, limite, omitir }),
  });

  if (!response.ok) throw new Error("Error al buscar notificaciones");
  const data = await response.json();
  return data.datos;
}

export async function createNotification(evento) {
  const response = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(evento),
  });

  if (!response.ok) throw new Error("Error al crear notificación");
  return response.json();
}

export async function updateNotification(id, evento) {
  const response = await fetch(`${API_URL}/actualizar/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(evento),
  });

  if (!response.ok) throw new Error("Error al actualizar notificación");
  return response.json();
}

export async function deleteNotification(id) {
  const response = await fetch(`${API_URL}/eliminar/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar notificación");
  return response.json();
}

export async function createMassNotifications(evento) {
  const response = await fetch(`${API_URL}/masivas`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(evento),
  });
  if (!response.ok) throw new Error("Error al crear notificaciones masivas");
  return response.json();
}

export async function suspendNotification(id) {
  const response = await fetch(`${API_URL}/${id}/suspender`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al suspender notificación");
  return response.json();
}

export async function resumeNotification(id) {
  const response = await fetch(`${API_URL}/${id}/reanudar`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al reanudar notificación");
  return response.json();
}

export async function resendNotification(id, { phone_numbers, recipient_names }) {
  const response = await fetch(`${API_URL}/${id}/reenviar`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ phone_numbers, recipient_names }),
  });
  if (!response.ok) throw new Error("Error al reenviar notificación");
  return response.json();
}