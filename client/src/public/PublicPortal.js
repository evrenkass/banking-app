import React from "react";
import { Redirect, Route } from "react-router";

import { Login } from "./Login";
import { Register } from "./Register";

export const PublicPortal = () => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/login" />
    </>
  );
};
