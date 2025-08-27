// src/model/NotificationEvent.js
export class NotificationEvent {
  constructor({ id, event_name, message, recipient_name, phone_number, scheduled_at, status = 'pending' }) {
    this.id = id;
    this.event_name = event_name;
    this.message = message;
    this.recipient_name = recipient_name;
    this.phone_number = phone_number;
    this.scheduled_at = scheduled_at;
    this.status = status;
  }

  static validate(form) {
    const errors = {};

    if (!form.event_name.trim()) errors.event_name = "El nombre del evento es obligatorio";
    if (!form.message.trim()) errors.message = "El mensaje es obligatorio";

    // Teléfono internacional con + y 8–15 dígitos
    const phoneRegex = /^\+\d{8,15}$/;
    if (!phoneRegex.test(form.phone_number)) {
      errors.phone_number = "Número de teléfono inválido. Ejemplo: +521234567890";
    }
if (!form.scheduled_at) {
  errors.scheduled_at = "La fecha y hora son obligatorias";
} else {
  const now = new Date();

  // Quitar segundos y ms
  now.setSeconds(0, 0);

  const [datePart, timePart] = form.scheduled_at.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const selected = new Date(year, month - 1, day, hour, minute);

  if (selected < now) {
    errors.scheduled_at = "La fecha y hora no pueden estar en el pasado";
  }
}

    return errors;
  }
}
