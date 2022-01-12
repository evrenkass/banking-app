import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useForm, useAuth } from "../hooks";
import { Alert, Input, SubmitButton } from "../components";

export const Login = () => {
  const { authenticate } = useAuth();
  const [handleSubmit, handleChange, getValue, formStatus, validation] =
    useForm({
      initialValues: {
        email: "",
        password: "",
      },
      validate: ({ email, password }) => {
        return {
          email: email ? null : "Field cannot be empty",
          password: password ? null : "Field cannot be empty",
        };
      },
      onSubmit: async ({ email, password }, reset) => {
        const auth = getAuth();
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        authenticate(credentials.user);

        reset();
        return "Logged in";
      },
    });

  return (
    <div
      className="container align-middle"
      style={{
        position: "absolute",
        height: 500,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="row">
        <div className="col p-5">
          <img src="/login.svg" alt="Login" className="img-fluid" />
        </div>
        <div className="col d-flex align-items-center">
          <div className="p-3">
            {formStatus.message && (
              <Alert type={formStatus.type}>{formStatus.message}</Alert>
            )}
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  value={getValue("email")}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={getValue("password")}
                  onChange={handleChange("password")}
                />
              </div>

              <SubmitButton
                type="submit"
                disabled={!validation.ok}
                submitting={formStatus.type === "submitting"}
              >
                Sign in
              </SubmitButton>
            </form>
            <Link to="/register" className="link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
