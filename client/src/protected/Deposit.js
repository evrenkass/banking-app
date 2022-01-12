import React from "react";

import { makeDeposit } from "../core/api";
import { useApi, useForm } from "../hooks";
import { Card, Alert, Input, SubmitButton } from "../components";

export function Deposit() {
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
          throw new Error("Deposit amount cannot be less than ZERO");
        }

        const { total } = await fetchApi(makeDeposit, {
          amount,
          note,
        });

        reset();

        return `${amount} deposited. Current balance: ${total}`;
      },
    });

  return (
    <>
      {formStatus.message && (
        <Alert type={formStatus.type}>{formStatus.message}</Alert>
      )}
      <Card bgColor="primary" header="Make a deposit">
        <form method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3">
              <Input
                name="value"
                label="Deposit amount"
                placeholder="Enter deposit value"
                value={getValue("value")}
                onChange={handleChange("value")}
              />
            </div>
            <div className="mb-3">
              <Input
                name="note"
                label="Deposit note"
                placeholder="Enter deposit note"
                value={getValue("note")}
                onChange={handleChange("note")}
              />
            </div>
            <div class="mb-3">
              <SubmitButton
                disabled={!validation.ok}
                submitting={formStatus.type === "submitting"}
              >
                Deposit
              </SubmitButton>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}
