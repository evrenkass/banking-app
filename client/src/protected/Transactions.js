import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { getTransactions } from "../core/api";
import { useFetcher } from "../hooks";
import { Card } from "../components";

const TransactionTable = ({ data }) => {
  if (!data) return null;

  const balance = data.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <table class="table table-light table-hover table-striped table-bordered">
      <thead>
        <tr>
          <th colSpan={4}>Current Balance: {balance}</th>
        </tr>

        <tr>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.note}</td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function Transactions() {
  const [{ data, loading, error }] = useFetcher(getTransactions);

  let content = null;
  if (loading) {
    content = (
      <div className="w-100 text-center">
        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
      </div>
    );
  } else if (error) {
    content = (
      <div className="w-100 text-danger text-center">
        <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
        <p className="mt-2">{error}</p>
      </div>
    );
  } else if (data) {
    content = <TransactionTable data={data} />;
  }

  return <Card header="Transactions">{content}</Card>;
}
