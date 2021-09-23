import React from "react";
import { UserContext } from "./context";
import { Card } from "./Card";

export function AllData() {
  const ctx = React.useContext(UserContext);
  return (
    <Card header="All Data">
      <table class="table table-light table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {ctx.users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
