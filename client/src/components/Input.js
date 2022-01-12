import React from "react";

export const Input = ({
  type = "text",
  name,
  onChange,
  value,
  label,
  placeholder,
}) => (
  <div className="form-floating">
    <input
      className="form-control"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);
