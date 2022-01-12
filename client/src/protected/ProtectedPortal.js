import React from "react";

import { Route, Redirect } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Deposit } from "./Deposit";
import { Withdraw } from "./Withdraw";
import { Transfer } from "./Transfer";
import { Transactions } from "./Transactions";
import { EditProfile } from "./EditProfile";

export const ProtectedPortal = () => {
  return (
    <>
      <NavBar />
      <div className="container w-50 py-4">
        <Route path="/deposit" component={Deposit} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/transfer" component={Transfer} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </div>
    </>
  );
};
