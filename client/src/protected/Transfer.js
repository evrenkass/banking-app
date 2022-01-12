import React from "react";

import { getUsers, makeTransfer } from "../core/api";
import { useForm, useApi, useFetcher } from "../hooks";
import { Card, Alert, Input, Select, SubmitButton } from "../components";

export function Transfer() {
  const fetchApi = useApi();
  const [handleSubmit, handleChange, getValue, formStatus, validation] =
    useForm({
      initialValues: {
        value: "",
        note: "",
        recipient: "",
      },
      validate: ({ value, note, recipient }) => {
        return {
          value: value ? null : "Field cannot be empty",
          note: note ? null : "Field cannot be empty",
          recipient: recipient ? null : "Field cannot be empty",
        };
      },
      onSubmit: async ({ value, note, recipient }, reset) => {
        const amount = parseFloat(value);
        if (amount < 0) {
          throw new Error("Transfer amount cannot be less than ZERO");
        }

        const { total } = await fetchApi(makeTransfer, {
          amount,
          note,
          recipient,
        });

        reset();
        const foundUser = users.find(
          (user) => user.accountNumber === recipient
        );

        return `${amount} transferred to ${foundUser.name}. Current balance: ${total}`;
      },
    });

  const [{ data: users = [], loading, error }] = useFetcher(getUsers);

  return (
    <>
      {formStatus.message && (
        <Alert type={formStatus.type}>{formStatus.message}</Alert>
      )}
      <Card bgColor="primary" header="Make a transfer">
        <form method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div class="mb-3">
              <Select
                name="recipient"
                label="Recipient"
                emptyLabel="Select recipient"
                onChange={handleChange("recipient")}
                value={getValue("recipient")}
                disabled={loading || Boolean(error)}
                showSpinner={loading}
                showError={Boolean(error)}
                options={users.map(({ accountNumber, name }) => ({
                  value: accountNumber,
                  label: `${name} (${accountNumber})`,
                }))}
              />
            </div>
            <div class="mb-3">
              <Input
                name="value"
                label="Transfer amount"
                placeholder="Enter deposit value"
                value={getValue("value")}
                onChange={handleChange("value")}
              />
            </div>
            <div class="mb-3">
              <Input
                name="note"
                label="Transfer note"
                placeholder="Enter transfer note"
                value={getValue("note")}
                onChange={handleChange("note")}
              />
            </div>
            <div class="mb-3">
              <SubmitButton
                disabled={!validation.ok}
                submitting={formStatus.type === "submitting"}
              >
                Transfer
              </SubmitButton>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}
