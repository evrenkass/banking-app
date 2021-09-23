import React from "react";
import { UserContext } from "./context";
import { Card } from "./Card";

export function CreateAccount() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  function validate(field, label, validators) {
    for (let i in validators) {
      const validator = validators[i];
      if (validator === "no-blank") {
        if (!field) {
          setStatus((status) => ({
            ...status,
            [label]: `${label} cannot be blank`,
          }));
          return false;
        }
      } else if (validator === "password") {
        if (!field || field.length < 8) {
          setStatus((status) => ({
            ...status,
            [label]: `${label} must be at least 8 characters long`,
          }));
          return false;
        }
      }
    }

    return true;
  }

  function handleCreate() {
    setStatus({
      name: undefined,
      email: undefined,
      password: undefined,
    });

    let success = true;
    if (!validate(name, "name", ["no-blank"])) success = false;
    if (!validate(email, "email", ["no-blank"])) success = false;
    if (!validate(password, "password", ["password"])) success = false;

    if (success) {
      ctx.users.push({ name, email, password, balance: 0 });
      setShow(false);
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  const noInput = !name && !email && !password;

  const getClassForInput = (field) => {
    let className = "form-control";
    if (status[field]) {
      className += " is-invalid";
    }
    return className;
  };

  return (
    <Card header="Create Account">
      {show ? (
        <div className="row">
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={getClassForInput("name")}
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            {status.name !== undefined && (
              <div className="invalid-feedback">{status.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className={getClassForInput("email")}
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            {status.email !== undefined && (
              <div className="invalid-feedback">{status.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">
              Password address
            </label>
            <input
              type="password"
              className={getClassForInput("password")}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            {status.password !== undefined && (
              <div className="invalid-feedback">{status.password}</div>
            )}
          </div>
          <div class="mb-3">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleCreate}
              disabled={noInput}
            >
              Create Account
            </button>
          </div>
        </div>
      ) : (
        <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-dark" onClick={clearForm}>
            Add another account
          </button>
        </>
      )}
    </Card>
  );
}
