import { useState } from "react";

export const useForm = ({ onSubmit, initialValues = {}, validate }) => {
  const [formState, setFormState] = useState(initialValues);
  const [formStatus, setFormStatus] = useState({
    type: undefined,
    message: undefined,
  });

  const reset = () => {
    setFormState(initialValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormStatus({ type: "submitting", messaged: undefined });
      const success = await onSubmit(formState, reset);

      setFormStatus({ type: "success", message: success });
    } catch (e) {
      setFormStatus({ type: "danger", message: e.message });
    }
  };

  const getValue = (field) => formState[field];

  const handleChange = (field) => (e) => {
    setFormState((state) => ({ ...state, [field]: e.target.value }));
  };

  const validateForm = () => {
    if (!validate) return { ok: true, data: {} };

    const data = validate(formState);
    const ok = Object.values(data).every((val) => !val);
    return { ok, data };
  };

  const validation = validateForm(formState);

  return [handleSubmit, handleChange, getValue, formStatus, validation];
};
