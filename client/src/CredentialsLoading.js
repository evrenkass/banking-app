import React from "react";

export const CredentialsLoading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div className="w-50 text-center">
        <img src="/authorizing.svg" alt="Authorizing" className="img-fluid" />
        <h2 className="mt-2">Authorizing</h2>
      </div>
    </div>
  );
};
