import React from "react";

import { makeWithdrawal } from "../core/api";
import { useApi, useForm } from "../hooks";
import { Card, Alert, Input, SubmitButton } from "../components";

export function Withdraw() {
  const fetchApi = useApi();
  const [handleSubmit, handleChange, getValue, formStatus, validation] =
    useForm({
      initialValues: {
        value: "",
        note: "",
      },
      validate: ({ value, note }) => {
        return {
          value: value ? null : "Field cannot be empty",
          note: note ? null : "Field cannot be empty",
        };
      },
      onSubmit: async ({ value, note }, reset) => {
        const amount = parseFloat(value);
        if (amount < 0) {
          throw new Error("Withdrawal amount cannot be less than ZERO");
        }

        const { total } = await fetchApi(makeWithdrawal, {
          amount,
          note,
        });

        reset();

        return `${amount} withdrawn. Current balance: ${total}`;
      },
    });

  return (
    <>
      {formStatus.message && (
        <Alert type={formStatus.type}>{formStatus.message}</Alert>
      )}
      <Card bgColor="primary" header="Make a withdrawal">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="row">
            <div class="mb-3">
              <Input
                name="value"
                label="Withdrawal amount"
                placeholder="Enter withdrawal value"
                value={getValue("value")}
                onChange={handleChange("value")}
              />
            </div>
            <div class="mb-3">
              <Input
                name="note"
                label="Withdrawal note"
                placeholder="Enter withdrawal note"
                value={getValue("note")}
                onChange={handleChange("note")}
              />
            </div>
            <div class="mb-3">
              <SubmitButton
                disabled={!validation.ok}
                submitting={formStatus.type === "submitting"}
              >
                Withdraw
              </SubmitButton>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}
