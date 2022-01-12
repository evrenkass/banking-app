import React from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { createProfile } from "../core/api";
import { useAuth, useForm } from "../hooks";
import { Alert, Input, SubmitButton } from "../components";

export const Register = () => {
  const auth = getAuth();
  const { authenticate } = useAuth();

  const [handleSubmit, handleChange, getValue, formStatus, validation] =
    useForm({
      initialValues: {
        email: "",
        password: "",
        name: "",
      },
      validate: ({ email, name, password }) => {
        return {
          email: email ? null : "Field cannot be empty",
          name: name ? null : "Field cannot be empty",
          password:
            password && password.length >= 8
              ? null
              : "Password must be at least 8 characters long",
        };
      },
      onSubmit: async ({ email, name, password }, reset) => {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await createProfile(user.accessToken, { name });
        authenticate(user);
        reset();
        return "Account created";
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
          <img src="/register.svg" alt="Login" className="img-fluid" />
        </div>
        <div className="col d-flex align-items-center">
          <div className="p-3">
            {formStatus.message && (
              <Alert type={formStatus.type}>{formStatus.message}</Alert>
            )}
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  value={getValue("name")}
                  onChange={handleChange("name")}
                />
              </div>
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
                disabled={!validation.ok}
                submitting={formStatus.type === "submitting"}
              >
                Register
              </SubmitButton>
            </form>
            <Link to="/Login" className="link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
