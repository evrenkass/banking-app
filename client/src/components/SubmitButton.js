import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export const SubmitButton = ({
  children,
  disabled = false,
  submitting = false,
}) => (
  <button
    type="submit"
    className="btn btn-bank"
    disabled={disabled || submitting}
  >
    {submitting && (
      <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginRight: 5 }} />
    )}
    {children}
  </button>
);
