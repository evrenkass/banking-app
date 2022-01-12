import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export const Select = ({
  name,
  onChange,
  value,
  label,
  placeholder,
  options,
  emptyLabel = "Select option",
  disabled = false,
  showSpinner = false,
  showError = false,
}) => (
  <div className="input-group form-floating">
    <select
      className="form-control"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
    >
      <option value="">{emptyLabel}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label htmlFor={name}>{label}</label>
    {showSpinner ? (
      <span className="input-group-text">
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </span>
    ) : (
      showError && (
        <span className="input-group-text text-danger">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </span>
      )
    )}
  </div>
);
