import React, { useState } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Textarea from "../atoms/Textarea";

export default function EventFields({ form, errors, onChange, isMassive, setIsMassive, recipientsText, setRecipientsText }) {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-3">
      <div>
        <Label>Tipo de envío</Label>
        <select
          value={isMassive ? "massive" : "single"}
          onChange={(e) => setIsMassive(e.target.value === "massive")}
          className="border p-2 rounded"
        >
          <option value="single">Individual</option>
          <option value="massive">Masivo</option>
        </select>
      </div>

      <div>
        <Label htmlFor="event_name">Nombre de la notificación</Label>
        <Input
          id="event_name"
          name="event_name"
          value={form.event_name}
          onChange={onChange}
          required
        />
        {errors.event_name && <p className="text-red-600 text-sm">{errors.event_name}</p>}
      </div>

      <div>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          required
        />
        {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
      </div>

      <div>
        <Label htmlFor="scheduled_at">Fecha y hora programada</Label>
        <Input
          type="datetime-local"
          id="scheduled_at"
          name="scheduled_at"
          value={form.scheduled_at}
          onChange={onChange}
          required
          min={localISOTime}
        />
        {errors.scheduled_at && <p className="text-red-600 text-sm">{errors.scheduled_at}</p>}
      </div>

      {!isMassive ? (
        <>
          <div>
            <Label htmlFor="recipient_name">Nombre del Destinatario</Label>
            <Input
              id="recipient_name"
              name="recipient_name"
              value={form.recipient_name}
              onChange={onChange}
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Teléfono</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              onChange={onChange}
              required
            />
          </div>
        </>
      ) : (
        <div>
          <Label>Destinatarios (uno por línea: +521234567890, Nombre)</Label>
          <Textarea
  value={recipientsText}
  onChange={(e) => setRecipientsText(e.target.value)}
  rows={5}
  placeholder={"+521234567890, Pedro Martínez\n+521234567891, Juan Pérez"}
  required
/>

        </div>
      )}
    </div>
  );
}
