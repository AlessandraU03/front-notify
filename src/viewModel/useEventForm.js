// src/viewModel/useEventForm.js
import { useState } from "react";
import { NotificationEvent } from "../model/NotificationEvent";

export function useEventForm(initialForm, onSubmitCallback) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = NotificationEvent.validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSubmitCallback(form);
    }
  };

  return { form, setForm, errors, onChange, handleSubmit };
}
