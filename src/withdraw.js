import React from "react";
import { UserContext } from "./context";
import { Card } from "./Card";
import { Alert } from "./Alert";

export function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [withdrawValue, setWithdrawValue] = React.useState("");
  const [targetUser, setTargetUser] = React.useState("");
  const [status, setStatus] = React.useState({ message: "", type: undefined });

  const handleWithdraw = () => {
    const foundUser = ctx.users.find((user) => user.email === targetUser);
    const withdrawNumber = parseInt(withdrawValue, 10);

    if (!foundUser) {
      setStatus({ message: "User not found", type: "danger" });
    } else if (isNaN(withdrawNumber) || withdrawNumber <= 0) {
      setStatus({
        message: `Withdrawn value must be a positive number`,
        type: "danger",
      });
    } else if (withdrawNumber > foundUser.balance) {
      setStatus({
        message: `Balance overdraft! Current balance: ${foundUser.balance}`,
        type: "danger",
      });
    } else {
      foundUser.balance -= withdrawNumber;
      setTargetUser("");
      setWithdrawValue("");
      setStatus({
        message: `${withdrawNumber} withdrawn from ${foundUser.name}. Current Balance: ${foundUser.balance}`,
        type: "success",
      });
    }
  };

  const handleUserSelect = (user) => {
    setTargetUser(user);
  };

  const noInput = !withdrawValue || !targetUser;

  return (
    <>
      {status.type !== undefined && (
        <Alert type={status.type}>{status.message}</Alert>
      )}
      <Card bgcolor="primary" header="Withdraw">
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
            <label for="withdraw-value" className="form-label">
              Withhdraw amount
            </label>
            <input
              type="input"
              className="form-control"
              id="withdraw-value"
              placeholder="Enter withdraw value"
              value={withdrawValue}
              onChange={(e) => setWithdrawValue(e.currentTarget.value)}
            />
          </div>
          <div class="mb-3">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleWithdraw}
              disabled={noInput}
            >
              Withdraw
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
