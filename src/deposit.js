import React from "react";
import { UserContext } from "./context";
import { Card } from "./Card";
import { Alert } from "./Alert";

export function Deposit() {
  const ctx = React.useContext(UserContext);
  const [depositValue, setDepositValue] = React.useState("");
  const [targetUser, setTargetUser] = React.useState("");
  const [status, setStatus] = React.useState({ message: "", type: undefined });

  const handleDeposit = () => {
    const foundUser = ctx.users.find((user) => user.email === targetUser);
    const depositNumber = parseInt(depositValue, 10);

    if (!foundUser) {
      setStatus({ message: "User not found", type: "danger" });
    } else if (isNaN(depositNumber) || depositNumber <= 0) {
      setStatus({
        message: `Deposited value must be a positive number`,
        type: "danger",
      });
    } else {
      foundUser.balance += depositNumber;
      setTargetUser("");
      setDepositValue("");
      setStatus({
        message: `${depositValue} deposited to ${foundUser.name}. Current Balance: ${foundUser.balance}`,
        type: "success",
      });
    }
  };

  const handleUserSelect = (user) => {
    setTargetUser(user);
  };

  const noInput = !depositValue || !targetUser;

  return (
    <>
      {status.type !== undefined && (
        <Alert type={status.type}>{status.message}</Alert>
      )}
      <Card bgColor="primary" header="Make a deposit">
        <div className="row">
          <div class="mb-3">
            <label for="select-user" className="form-label">
              Select user
            </label>
            <select
              id="select-user"
              className="form-select"
              onChange={(e) => handleUserSelect(e.target.value)}
              value={targetUser}
            >
              <option value="">Select user</option>
              {ctx.users.map((user) => (
                <option value={user.email}>{user.name}</option>
              ))}
            </select>
          </div>
          <div class="mb-3">
            <label for="deposit-value" className="form-label">
              Deposit amount
            </label>
            <input
              type="text"
              className="form-control"
              id="deposit-value"
              placeholder="Enter deposit value"
              value={depositValue}
              onChange={(e) => setDepositValue(e.currentTarget.value)}
            />
          </div>
          <div class="mb-3">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleDeposit}
              disabled={noInput}
            >
              Deposit
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
