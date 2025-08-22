import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Textarea from '../atoms/Textarea';

const ladas = [
  { code: "+52", label: "México (+52)" },
  { code: "+57", label: "Colombia (+57)" },
  { code: "+1", label: "USA/Canadá (+1)" },
];

export default function EventFields({ form, errors, onChange }) {

  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

const matchedLada = ladas.find(l => form.phone_number.startsWith(l.code));
const lada = matchedLada ? matchedLada.code : "+52";
const number = matchedLada
  ? form.phone_number.slice(matchedLada.code.length)
  : form.phone_number;

const handleLadaChange = (e) => {
  const newLada = e.target.value;
  onChange({ target: { name: "phone_number", value: `${newLada}${number}` } });
};

const handleNumberChange = (e) => {
  const newNumber = e.target.value.replace(/\D/g, "");
  onChange({ target: { name: "phone_number", value: `${lada}${newNumber}` } });
};

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="event_name">Nombre de la notificacion</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <Label>Teléfono</Label>
          <div className="flex gap-2">
            <select value={lada} onChange={handleLadaChange} className="border rounded-lg p-2">
              {ladas.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <Input
              id="phone_number"
              name="phone_number"
              value={number}
              onChange={handleNumberChange}
              placeholder="Número Telefónico"
              required
            />
          </div>
          {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number}</p>}
        </div>
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
    </div>
  );
}
